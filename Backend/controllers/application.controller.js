import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ message: "Invalid job id", success: false });
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job", success: false });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    const newApplication = await Application.create({ job: jobId, applicant: userId });
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({ message: "Application submitted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "company" },
      });

    return res.status(200).json({ application, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const applications = await Application.find({ job: jobId })
      .sort({ createdAt: -1 })
      .populate({ path: "applicant", select: "fullname email phoneNumber profile.resume createdAt" })
      .populate({ path: "job", select: "title" });

    return res.status(200).json({
      success: true,
      message: "Applicants fetched successfully",
      applications,
    });
  } catch (error) {
    console.error("Error in getApplicants:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found.", success: false });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({ message: "Application status updated", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};
