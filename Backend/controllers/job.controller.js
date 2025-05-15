import { Job } from "../models/job.model.js";

// users job post
export const jobPost = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      companyId,
      experience,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId ||
      !experience
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
        status: false,
      });
    }
    const job = await job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      position,
      company: companyId,
      experienceLevel: experience,
      created_by: userId,
    });
    return res.status(200).json({
      message: "Job posted successfully",
      status: true,
      job,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};
//  users
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
      path: "company"
    }.sort({ createdAt: -1 }));
    
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Jobs fetched successfully",
      status: true,
      jobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};
// for the user
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Job fetched successfully",
      status: true,
      job,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};

// for the admin

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Jobs fetched successfully",
      status: true,
      jobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};
