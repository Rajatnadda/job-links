import { Job } from "../models/job.model.js";

// POST /api/job/post
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

    const reqs = Array.isArray(requirements)
      ? requirements
      : requirements.split(",").map((item) => item.trim()).filter(Boolean);

    const job = await Job.create({
      title,
      description,
      requirements: reqs,
      salary,
      location,
      jobType,
      experience: Number(experience),
      position: Number(position),
      company,
      created_by: req.id,
      applications: [],
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
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

// Get all jobs
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
      return res.status(200).json({ jobs: [], success: true }); // ✅ Avoid 404 here
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Error fetching admin jobs:", error.message);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
