import { Job } from "../models/job.model.js";

// Admin job posting
export const postJob = async (req, res) => {
  try {
    console.log("REQ.ID:", req.id);
    console.log("REQ.BODY:", req.body);

    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
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
      !companyId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
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
      company: companyId,
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


// Get all jobs with optional keyword filter
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id.trim();
    const job = await Job.findById(jobId).populate("applications");
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("Error fetching job by ID:", error.message);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// Get jobs posted by admin user
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId })
      .populate("company")
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Error fetching admin jobs:", error.message);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
