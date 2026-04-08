import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const isPdf = file.originalname.toLowerCase().endsWith('.pdf') || file.mimetype === 'application/pdf';
        return {
            folder: "user_documents",
            resource_type: isPdf ? "raw" : "auto",
            allowed_formats: ["jpg", "jpeg", "png", "pdf"]
        };
    }
});

const upload = multer({ storage });

export default upload;