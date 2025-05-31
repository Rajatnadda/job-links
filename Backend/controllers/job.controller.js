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
    } = req.body; // note key 'company' here

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

    // Handle requirements array or string
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
      experienceLevel: Number(experience), // DB field name
      position: Number(position),
      company,                              // DB expects 'company'
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

// (Other controller functions unchanged)
