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
        const babies = await BabyInfo.find().populate('user', 'name phone email');
        res.status(200).json({ count: babies.length, babies });
    } catch (err) {
        res.status(500).json({ message: "Error fetching all babies: " + err.message });
    }
}

const registerChild = async (req, res) => {
    try {
        let { userId, babyName, dateOfBirth, motherConceiveDate } = req.body;

        if (req.user.role === 'user') {
            userId = req.user.id;
        }

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
            scheduledDate.setDate(dob.getDate() + (vaccine.timingInWeeks * 7));

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
        const babyInfoId = req.query.babyInfoId || req.body?.babyInfoId;

        if (!babyInfoId) {
            return res.status(400).json({ message: "babyInfoId is required" });
        }

        // First, find all vaccines that belong to the "baby" category
        const babyVaccines = await Vaccine.find({ category: "baby" }).select("_id");
        const babyVaccineIds = babyVaccines.map(v => v._id);

        const pendingVaccines = await UserVaccine.find({
            babyInfo: babyInfoId,
            status: "Pending",
            vaccine: { $in: babyVaccineIds }
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
        const { babyInfoId, name, description, sideEffects, timingInWeeks, category } = req.body;

        if (!babyInfoId || !name || !description || !timingInWeeks || !category) {
            return res.status(400).json({
                message: "babyInfoId, name, description, timingInWeeks, and category are required."
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
            timingInWeeks,
            category,
            isDefault: false
        });
        await createVaccine.save();

        // Compute scheduled date from baby's DOB
        const dob = new Date(babyInfo.dateOfBirth);
        const scheduledDate = new Date(dob);
        scheduledDate.setDate(dob.getDate() + (timingInWeeks * 7));

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
        const userVaccine = await UserVaccine.findById(userVaccineId).populate('babyInfo');
        if (!userVaccine) {
            return res.status(404).json({ message: "User vaccine not found" });
        }

        if (req.user.role !== 'admin' && userVaccine.babyInfo.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied. You can only update vaccines for your own children." });
        }

        userVaccine.status = "Completed";
        await userVaccine.save();
        res.status(200).json({ message: "User vaccine status set to completed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error setting user vaccine status to completed: " + error.message });
    }
}
export { getAllUsers, getAllBabies, registerChild, getPendingVaccinesForComingMonth, insertSpecialVaccine, setPendingStatus };