import express from 'express';
import authenticateToken from '../middleware/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, jobPost } from '../controllers/job.controller.js';

const router = express.Router();
router.route("/post").post(authenticateToken, jobPost);
router.route("/get/").get(authenticateToken, getAllJobs);
router.route("/getAdminJobs").get(authenticateToken, getAdminJobs);
router.route("/get/:id ").get(authenticateToken, getJobById);

export default router;