import mongoose from "mongoose";
import dotenv from "dotenv";
import BabyInfo from "../models/babyInfo.js";
import UserVaccine from "../models/userVaccine.js";
import MasterVaccine from "../models/masterVaccine.js";

dotenv.config();

const fixMissingVaccines = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("🌱 Connected to DB. Checking babies...");

        const babies = await BabyInfo.find({});
        const masterVaccines = await MasterVaccine.find({ isDefault: true });

        if (masterVaccines.length === 0) {
            console.log("❌ No master vaccines found. Run seedVaccine.js first.");
            process.exit(1);
        }

        for (let baby of babies) {
            const existing = await UserVaccine.find({ babyInfo: baby._id });
            if (existing.length === 0) {
                console.log(`⚠️ Baby ${baby.babyName} has no vaccines! Generating...`);
                const dob = new Date(baby.dateOfBirth);
                
                const userVaccines = masterVaccines.map(vaccine => {
                    const scheduledDate = new Date(dob);
                    scheduledDate.setDate(dob.getDate() + (vaccine.ageInWeeks * 7));
                    return {
                        babyInfo: baby._id,
                        vaccine: vaccine._id,
                        scheduledDate,
                        status: "Pending"
                    };
                });

                await UserVaccine.insertMany(userVaccines);
                console.log(`✅ Generated ${userVaccines.length} vaccines for ${baby.babyName}.`);
            } else {
                console.log(`✅ Baby ${baby.babyName} already has ${existing.length} vaccines.`);
            }
        }

        console.log("🏁 Done fixing missing vaccines.");
        process.exit();
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

fixMissingVaccines();
