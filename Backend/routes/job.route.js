import express from 'express';
import authenticateToken from '../middleware/isAuthenticated.js';
import {
  postJob,
  getAllJobs,
  getAdminJobs,
  getJobById
} from '../controllers/job.controller.js';

const router = express.Router();

// Route to post a new job (Recruiter/Admin only)
router.post("/post", authenticateToken, postJob);

// Route to get all jobs (public or authenticated users)
router.get("/get", authenticateToken, getAllJobs);

// Route to get admin-specific jobs (Recruiter/Admin only)
router.get("/getAdminJobs", authenticateToken, getAdminJobs);

// Route to get job by ID
router.get("/get/:id", authenticateToken, getJobById); // Removed accidental space in ":id "

export default router;
