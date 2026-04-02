import User from '../models/user.js';
import Vaccine from '../models/masterVaccine.js';
import UserVaccine from '../models/userVaccine.js';
import BabyInfo from '../models/babyInfo.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users: " + err });
    }
}

const getAllBabies = async (req, res) => {
    try {
        const babies = await BabyInfo.find().populate("user", "name phone email");
        res.status(200).json(babies);
    } catch (err) {
        res.status(500).json({ message: "Error fetching babies: " + err });
    }
}

const registerChild = async (req, res) => {
    try {
        const { userId, babyName, dateOfBirth, motherConceiveDate } = req.body;

        if (!userId || !babyName || !dateOfBirth) {
            return res.status(400).json({ message: "userId, babyName and dateOfBirth are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create BabyInfo document
        const babyInfo = new BabyInfo({
            user: userId,
            babyName,
            dateOfBirth: new Date(dateOfBirth),
            motherConceiveDate: motherConceiveDate ? new Date(motherConceiveDate) : null
        });
        await babyInfo.save();

        // Seed default vaccines for this baby
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

        await UserVaccine.insertMany(userVaccines);

        res.status(201).json({
            message: `Child ${babyName} registered and ${userVaccines.length} vaccines scheduled successfully`,
            babyInfo,
            vaccinesCount: userVaccines.length
        });

    } catch (err) {
        res.status(500).json({ message: "Error registering child: " + err.message });
    }
}

const getPendingVaccinesForComingMonth = async (req, res) => {
    try {
        const { babyInfoId } = req.query;

        if (!babyInfoId) {
            return res.status(400).json({ message: "babyInfoId is required" });
        }

        const pendingVaccines = await UserVaccine.find({
            babyInfo: babyInfoId,
            status: "Pending",
        }).populate("vaccine").populate("babyInfo").sort({ scheduledDate: 1 });

        res.status(200).json({
            count: pendingVaccines.length,
            vaccines: pendingVaccines
        });

    } catch (err) {
        res.status(500).json({
            message: "Error fetching pending vaccines: " + err.message
        });
    }
};

const insertSpecialVaccine = async (req, res) => {
    try {
        const { babyInfoId, name, description, sideEffects, ageInWeeks, category } = req.body;

        if (!babyInfoId || !name || !description || !ageInWeeks || !category) {
            return res.status(400).json({
                message: "babyInfoId, name, description, ageInWeeks, and category are required."
            });
        }

        // Verify the baby exists
        const babyInfo = await BabyInfo.findById(babyInfoId);
        if (!babyInfo) {
            return res.status(404).json({ message: "Baby info not found" });
        }

        // Create the vaccine in master collection
        const createVaccine = new Vaccine({
            name,
            description,
            sideEffects,
            ageInWeeks,
            category,
            isDefault: false
        });
        await createVaccine.save();

        // Compute scheduled date from baby's DOB
        const dob = new Date(babyInfo.dateOfBirth);
        const scheduledDate = new Date(dob);
        scheduledDate.setDate(dob.getDate() + (ageInWeeks * 7));

        // Create user vaccine record
        const userVaccine = new UserVaccine({
            babyInfo: babyInfoId,
            vaccine: createVaccine._id,
            scheduledDate,
            status: "Pending"
        });
        await userVaccine.save();

        res.status(201).json({
            message: "Special vaccine created and scheduled successfully",
            vaccine: createVaccine,
            userVaccine
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating special vaccine: " + error.message });
    }
}

const setPendingStatus = async (req, res) => {
    try {
        const { userVaccineId } = req.body;
        if (!userVaccineId) {
            return res.status(400).json({ message: "userVaccineId is required" });
        }
        const userVaccine = await UserVaccine.findById(userVaccineId);
        if (!userVaccine) {
            return res.status(404).json({ message: "User vaccine not found" });
        }
        userVaccine.status = "Completed";
        await userVaccine.save();
        res.status(200).json({ message: "User vaccine status set to completed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error setting user vaccine status to completed: " + error.message });
    }
}
export { getAllUsers, getAllBabies, registerChild, getPendingVaccinesForComingMonth, insertSpecialVaccine, setPendingStatus };