import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from '../utils/cloud.js';

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    // Debugging: check user info
    console.log("req.user:", req.user);

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(409).json({
        message: "Company already exists",
        success: false,
      });
    }

    // Use req.user.id (or req.user._id) depending on your auth middleware
    company = await Company.create({
      name: companyName,
      userId: req.user?.id || req.user?._id, // safely accessing user ID
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error during company registration.",
      success: false,
      error: error.message
    });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const companies = await Company.find({ userId });
    if (!companies || companies.length === 0) {
      return res.status(200).json({
        message: "No companies found for this user.",
        companies: [],
        success: true
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Error in getAllCompanies:", error);
    return res.status(500).json({ message: "Server error while fetching companies.", success: false, error: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error("Error in getCompanyById:", error);
    return res.status(500).json({ message: "Server error while fetching company by ID.", success: false, error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

    if (file) {
      const fileUri = getDataUri(file);
      if (fileUri && fileUri.content) {
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        updateData.logo = cloudResponse.secure_url;
      } else {
        console.warn("Could not process file for Cloudinary upload.");
      }
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ message: "Company updated successfully.", company, success: true });
  } catch (error) {
    console.error("Error in updateCompany:", error);
    return res.status(500).json({ message: "Server error during company update.", success: false, error: error.message });
  }
};
