import mongoose from "mongoose";
import Vaccine from "../models/masterVaccine.js";
import babyVaccinesSeed from "../data/babyVaccines.js";
import motherVaccinesSeed from "../data/motherVaccine.js";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env");
    process.exit(1);
}

const seedVaccines = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("🌱 Database connected. Seeding vaccines...");

        const allVaccines = [
            ...babyVaccinesSeed,
            ...motherVaccinesSeed
        ];

        await Vaccine.deleteMany({ isDefault: true, createdBy: null });

        await Vaccine.insertMany(allVaccines, { ordered: false });

        console.log("✅ Default vaccines seeded successfully!");
        process.exit(0);

    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedVaccines();