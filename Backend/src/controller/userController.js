import BabyInfo from "../models/babyInfo.js";
import UserVaccine from "../models/userVaccine.js";
import Vaccine from "../models/masterVaccine.js";
import User from "../models/user.js";

const allBaby = async (req, res) => {
    try {
        const userId = req.user.id;
        const babyInfo = await BabyInfo.find({ user: userId });
        res.status(200).json({
            count: babyInfo.length,
            babyInfo
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching baby info: " + error.message });
    }
}

const getUserVaccines = async (req, res) => {
    try {
        const { babyInfoId } = req.query;
        if (!babyInfoId) return res.status(400).json({ message: "babyInfoId is required" });
        
        // Ensure this baby belongs to the requesting user
        const baby = await BabyInfo.findById(babyInfoId);
        if (!baby || baby.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized access to this baby's records" });
        }
        
        const vaccines = await UserVaccine.find({
            babyInfo: babyInfoId
        }).populate("vaccine").sort({ scheduledDate: 1 });
        
        res.status(200).json(vaccines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -documents");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { address, dob, emergencyContact, medical, pregnancy } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (address !== undefined) user.address = address;
        if (dob !== undefined) user.dob = dob;
        if (emergencyContact !== undefined) user.emergencyContact = emergencyContact;
        if (medical !== undefined) user.medical = medical;
        if (pregnancy !== undefined) user.pregnancy = pregnancy;

        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const registerMyChild = async (req, res) => {
    try {
        const { babyName, dateOfBirth, gender, bloodGroup, motherConceiveDate } = req.body;
        const userId = req.user.id;

        if (!babyName || !dateOfBirth) {
            return res.status(400).json({ message: "babyName and dateOfBirth are required" });
        }

        const babyInfo = new BabyInfo({
            user: userId,
            babyName,
            dateOfBirth: new Date(dateOfBirth),
            gender: gender || null,
            bloodGroup: bloodGroup || null,
            motherConceiveDate: motherConceiveDate ? new Date(motherConceiveDate) : null
        });
        await babyInfo.save();

        const defaultVaccines = await Vaccine.find({ isDefault: true });
        const dob = new Date(dateOfBirth);
        const userVaccines = defaultVaccines.map(vaccine => {
            const scheduledDate = new Date(dob);
            scheduledDate.setDate(dob.getDate() + (vaccine.ageInWeeks * 7));
            return {
                babyInfo: babyInfo._id,
                vaccine: vaccine._id,
                scheduledDate,
                status: "Pending"
            };
        });

        if (userVaccines.length > 0) {
            await UserVaccine.insertMany(userVaccines);
        }

        res.status(201).json({
            message: `Child ${babyName} registered and ${userVaccines.length} vaccines scheduled`,
            babyInfo
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateMyChild = async (req, res) => {
    try {
        const { babyId } = req.params;
        const { babyName, dateOfBirth, gender, bloodGroup, motherConceiveDate } = req.body;
        
        const babyInfo = await BabyInfo.findById(babyId);
        if (!babyInfo) return res.status(404).json({ message: "Child not found" });
        if (babyInfo.user.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

        if (babyName) babyInfo.babyName = babyName;
        if (dateOfBirth) babyInfo.dateOfBirth = new Date(dateOfBirth);
        if (gender !== undefined) babyInfo.gender = gender;
        if (bloodGroup !== undefined) babyInfo.bloodGroup = bloodGroup;
        if (motherConceiveDate !== undefined) babyInfo.motherConceiveDate = motherConceiveDate ? new Date(motherConceiveDate) : null;

        await babyInfo.save();
        res.status(200).json({ message: "Child updated successfully", babyInfo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const setUserVaccineCompleted = async (req, res) => {
    try {
        const { userVaccineId } = req.body;
        if (!userVaccineId) return res.status(400).json({ message: "userVaccineId is required" });

        const userVaccine = await UserVaccine.findById(userVaccineId).populate('babyInfo');
        if (!userVaccine) return res.status(404).json({ message: "Vaccine record not found" });

        // Ensure user owns this baby
        if (userVaccine.babyInfo.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        userVaccine.status = "Completed";
        await userVaccine.save();

        res.status(200).json({ message: "Vaccine marked as completed successfully", userVaccine });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { allBaby, getUserVaccines, getUserProfile, updateUserProfile, registerMyChild, updateMyChild, setUserVaccineCompleted };
