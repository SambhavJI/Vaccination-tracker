import mongoose from "mongoose";

const vaccineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: String,
  sideEffects: String,

  ageInWeeks: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    enum: ["baby", "mother"],
    default: "baby"
  },

  isDefault: {
    type: Boolean,
    default: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }

}, { timestamps: true });

export default mongoose.model("Vaccine", vaccineSchema);