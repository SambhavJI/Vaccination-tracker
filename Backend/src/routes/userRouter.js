import express from 'express';
import { authMiddleware, authorizeRole } from '../middlewares/authMiddleware.js';
import { allBaby, getUserVaccines, getUserProfile, updateUserProfile, registerMyChild, updateMyChild, setUserVaccineCompleted } from '../controller/userController.js';
import upload from '../middlewares/upload.js';
import User from '../models/user.js';
import cloudinary from '../config/cloudinary.js';

const userRouter = express.Router();


userRouter.get(
    '/all-baby',
    authMiddleware,
    authorizeRole('user', 'admin'),
    allBaby
);

userRouter.get(
    '/vaccines',
    authMiddleware,
    authorizeRole('user'),
    getUserVaccines
);

userRouter.get('/profile', authMiddleware, authorizeRole('user', 'admin'), getUserProfile);
userRouter.put('/profile', authMiddleware, authorizeRole('user', 'admin'), updateUserProfile);

userRouter.post('/baby', authMiddleware, authorizeRole('user', 'admin'), registerMyChild);
userRouter.put('/baby/:babyId', authMiddleware, authorizeRole('user', 'admin'), updateMyChild);
userRouter.post('/set-completed-status', authMiddleware, authorizeRole('user', 'admin'), setUserVaccineCompleted);


userRouter.post(
    '/upload',
    authMiddleware,
    authorizeRole('user', 'admin'),
    (req, res, next) => {
        upload.single("document")(req, res, (err) => {
            if (err) {
                console.error('[Upload] Multer/Cloudinary error:', err);
                return res.status(500).json({ message: err.message });
            }
            next();
        });
    },
    async (req, res) => {
        try {
            console.log('[Upload] req.file:', req.file);
            console.log('[Upload] req.body:', req.body);
            const userId = req.user.id;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const file = req.file;

            if (!file) {
                console.error('[Upload] No file in req.file after multer');
                return res.status(400).json({ message: "No file uploaded" });
            }

            const newDoc = {
                url: file.path,
                public_id: file.filename,
                name: req.body.name || "Document"
            };

            console.log('[Upload] Saving doc to DB:', newDoc);
            user.documents.push(newDoc);
            await user.save();
            console.log('[Upload] Saved successfully');

            res.status(200).json({
                message: "Document uploaded successfully",
                document: user.documents[user.documents.length - 1]
            });

        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ message: error.message });
        }
    }
);


userRouter.get(
    '/documents',
    authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user.documents);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);


userRouter.delete(
    '/document/:docId',
    authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const doc = user.documents.id(req.params.docId);

            if (!doc) {
                return res.status(404).json({ message: "Document not found" });
            }

            if (doc.public_id) {
                await cloudinary.uploader.destroy(doc.public_id);
            }

            user.documents.pull(req.params.docId);
            await user.save();

            res.status(200).json({
                message: "Document deleted successfully"
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);


export default userRouter;