import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      company,
    } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const newJob = await Job.create({
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      company,
      created_by: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
