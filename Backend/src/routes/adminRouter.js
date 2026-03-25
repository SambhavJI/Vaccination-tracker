import express from 'express';
import { authMiddleware, authorizeRole } from '../middlewares/authMiddleware.js';
import { getAllUsers, registerChild, getPendingVaccinesForComingMonth, insertSpecialVaccine, setPendingStatus    } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/users', authMiddleware, authorizeRole('admin'), getAllUsers);
adminRouter.post('/register-child', authMiddleware, authorizeRole('admin', 'user'), registerChild);
adminRouter.get('/pending-vaccines', authMiddleware, authorizeRole('admin'), getPendingVaccinesForComingMonth);
adminRouter.post('/new-vaccine', authMiddleware, authorizeRole('admin'), insertSpecialVaccine);
adminRouter.post('/set-completed-status', authMiddleware, authorizeRole('admin', 'user'), setPendingStatus);

export default adminRouter;
