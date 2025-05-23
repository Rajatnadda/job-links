import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from '../utils/cloud.js';


export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
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
    company = await Company.create({
      name: companyName,
      userId: req.id, // Assuming req.id is populated by your authentication middleware
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

export const getAllCompanies = async (req, res) => { // Renamed from getAllCompany to follow plural convention
  try {
    const userId = req.id; // loggedin user id
    const companies = await Company.find({ userId });
    if (!companies || companies.length === 0) {
      return res.status(200).json({ // Or 404 if you prefer, but 200 with empty array is also common
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

//get company by id
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

//update company details
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
      //cloudinary
      const fileUri = getDataUri(file);
      if (fileUri && fileUri.content) {
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        updateData.logo = cloudResponse.secure_url;
      } else {
        // Handle case where fileUri might be invalid, though getDataUri should ideally throw if file is bad
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