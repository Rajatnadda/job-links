import { Job } from "../models/job.model.js";

// Admin job posting
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      company,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      experience === undefined ||
      position === undefined ||
      !company
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const reqs = Array.isArray(requirements)
      ? requirements
      : requirements.split(",").map((item) => item.trim()).filter(Boolean);

    const job = await Job.create({
      title,
      description,
      requirements: reqs,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experience),
      position: Number(position),
      company,
      created_by: userId,
    });

    res.status(201).json({
      message: "Job posted successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// Get jobs posted by admins/recruiters
export const getAdminJobs = async (req, res) => {
  try {
    // Example: fetch all jobs posted by the current user (assumed recruiter/admin)
    const userId = req.id;

    const adminJobs = await Job.find({ created_by: userId });

    res.status(200).json({
      success: true,
      jobs: adminJobs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Placeholder for getting all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Placeholder for getting a job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
