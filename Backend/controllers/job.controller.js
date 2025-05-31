import { Job } from "../models/job.model.js";

// @desc    Post a new job (Admin only)
// @route   POST /api/job/post
// @access  Private
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
        success: false,
        message: "All fields are required.",
      });
    }

    const reqs = Array.isArray(requirements)
      ? requirements
      : requirements
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);

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

    return res.status(201).json({
      success: true,
      message: "Job posted successfully.",
      job,
    });
  } catch (error) {
    console.error("Error posting job:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// @desc    Get all jobs posted by the current admin
// @route   GET /api/job/getAdminJobs
// @access  Private
export const getAdminJobs = async (req, res) => {
  try {
    const userId = req.id;

    const jobs = await Job.find({ created_by: userId });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching admin jobs:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching admin jobs",
    });
  }
};

// You can also export other functions here as needed (e.g. getAllJobs, getJobById)
