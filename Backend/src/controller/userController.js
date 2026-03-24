import BabyInfo from "../models/babyInfo.js";
import UserVaccine from "../models/userVaccine.js";

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

const getAllVaccines = async (req, res) => {
    try {
        const userId = req.user?.id || req.body?.userId;
        
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        // Get all babies for the logged-in user
        const babies = await BabyInfo.find({ user: userId });
        
        if (babies.length === 0) {
            return res.status(200).json({
                message: "No babies found for this user",
                data: {
                    totalVaccines: 0,
                    byStatus: {
                        pending: [],
                        completed: [],
                        missed: []
                    },
                    all: []
                }
            });
        }

        const babyIds = babies.map(baby => baby._id);

        // Get all vaccines for all babies with population
        const allVaccines = await UserVaccine.find({ babyInfo: { $in: babyIds } })
            .populate("vaccine", "name description timingInWeeks category sideEffects")
            .populate("babyInfo", "babyName dateOfBirth")
            .sort({ scheduledDate: -1 });

        // Organize vaccines by status
        const vaccinesByStatus = {
            pending: allVaccines.filter(v => v.status === "Pending"),
            completed: allVaccines.filter(v => v.status === "Completed"),
            missed: allVaccines.filter(v => v.status === "Missed")
        };

        res.status(200).json({
            message: "Vaccines retrieved successfully",
            data: {
                totalVaccines: allVaccines.length,
                byStatus: {
                    pending: {
                        count: vaccinesByStatus.pending.length,
                        vaccines: vaccinesByStatus.pending
                    },
                    completed: {
                        count: vaccinesByStatus.completed.length,
                        vaccines: vaccinesByStatus.completed
                    },
                    missed: {
                        count: vaccinesByStatus.missed.length,
                        vaccines: vaccinesByStatus.missed
                    }
                },
                all: allVaccines
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching vaccines: " + error.message });
    }
}

const pendingVaccination = async (req, res) => {
    try {
        const userId = req.user?.id || req.body?.userId;
        
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        // Get all babies for the logged-in user
        const babies = await BabyInfo.find({ user: userId });
        
        if (babies.length === 0) {
            return res.status(200).json({
                message: "No babies found for this user",
                count: 0,
                vaccines: []
            });
        }

        const babyIds = babies.map(baby => baby._id);

        // Get only pending vaccines
        const pendingVaccines = await UserVaccine.find({ 
            babyInfo: { $in: babyIds },
            status: "Pending"
        })
            .populate("vaccine", "name description timingInWeeks category sideEffects")
            .populate("babyInfo", "babyName dateOfBirth")
            .sort({ scheduledDate: 1 });

        res.status(200).json({
            message: "Pending vaccines retrieved successfully",
            count: pendingVaccines.length,
            vaccines: pendingVaccines
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching pending vaccines: " + error.message });
    }
}

export { allBaby, getAllVaccines, pendingVaccination };
