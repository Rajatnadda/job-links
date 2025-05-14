import express from 'express';
import authenticateToken from '../middleware/isAuthenticated.js';

const router = express.Router();
router.route("/register").post(authenticateToken, registerCompany);
router.route("/get/").get(authenticateToken, getAllCompany);
router.route("/get/:id").get(authenticateToken, getCompanyById);
router.route("/update/:id ").put(authenticateToken, updateCompany);

export default router;