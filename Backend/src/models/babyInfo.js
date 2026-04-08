import mongoose from "mongoose";

const babyInfoSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    babyName: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    motherConceiveDate: {
        type: Date,
        default: null
    },

    gender: {
        type: String,
        default: null
    },

    bloodGroup: {
        type: String,
        default: null
    }

}, { timestamps: true });

export default mongoose.model("BabyInfo", babyInfoSchema);
