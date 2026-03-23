import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 10,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user"
    },

    documents: [
        {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String
            },
            name: {
                type: String
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;