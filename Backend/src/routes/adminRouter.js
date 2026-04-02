import express from 'express';
import { authMiddleware, authorizeRole } from '../middlewares/authMiddleware.js';
import { getAllUsers, getAllBabies, registerChild, getPendingVaccinesForComingMonth, insertSpecialVaccine, setPendingStatus    } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/users', authMiddleware, authorizeRole('admin'), getAllUsers);
adminRouter.get('/babies', authMiddleware, authorizeRole('admin'), getAllBabies);
adminRouter.post('/register-child', authMiddleware, authorizeRole('admin'), registerChild);
adminRouter.get('/pending-vaccines', authMiddleware, authorizeRole('admin'), getPendingVaccinesForComingMonth);
adminRouter.post('/new-vaccine', authMiddleware, authorizeRole('admin'), insertSpecialVaccine);
adminRouter.post('/set-completed-status', authMiddleware, authorizeRole('admin'), setPendingStatus);

export default adminRouter;
