import express from 'express'
import { authMiddleware, authorizeRole } from '../middlewares/authMiddleware.js';
import { allBaby , getAllVaccines, pendingVaccination } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get('/all-baby', authMiddleware, authorizeRole('user','admin'), allBaby);
userRouter.get('/pending-vaccination', authMiddleware, authorizeRole('user','admin'), pendingVaccination);
userRouter.get('/all-vaccines', authMiddleware, authorizeRole('user','admin'), getAllVaccines);

export default userRouter;
