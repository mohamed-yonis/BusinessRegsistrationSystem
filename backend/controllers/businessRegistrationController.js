// controllers/businessRegistrationController.js
import BusinessRegistration from "../models/BusinessRegistration.js";
import { sendEmail } from "../utils/sendEmail.js";
import { registrationEmail } from "../utils/emailTemplates.js";

// Get all business registrations
export const getAllBusinesses = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { business_name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    const businesses = await BusinessRegistration.find(query)
      .populate("business_type_id", "name")
      .populate("owner_id", "full_name")
      .populate("city_id", "name");

    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching businesses", error });
  }
};

// Count businesses by status
export const countBusinessesByStatus = async (req, res) => {
  try {
    const pendingCount = await BusinessRegistration.countDocuments({ status: "Pending" });
    const approvedCount = await BusinessRegistration.countDocuments({ status: "Approved" });
    const rejectedCount = await BusinessRegistration.countDocuments({ status: "Rejected" });

    res.status(200).json({
      pending: pendingCount,
      approved: approvedCount,
      rejected: rejectedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error counting businesses", error });
  }
};

// Add a new business registration
export const createBusiness = async (req, res) => {
  const { business_name, business_type_id, owner_id, city_id, full_address, description, payment_status, status } = req.body;

  try {
    const newBusiness = new BusinessRegistration({ business_name, business_type_id, owner_id, city_id, full_address, description, payment_status, status });
    await newBusiness.save();

    // Send email notification
    const emailContent = registrationEmail(newBusiness);
    await sendEmail("zakimoha104@gmail.com", "New Business Registration", emailContent);

    res.status(201).json({ message: "Business created successfully", business: newBusiness });
  } catch (error) {
    res.status(500).json({ message: "Error creating business", error });
  }
};

// Update an existing business registration
export const updateBusiness = async (req, res) => {
  const { id } = req.params;
  const { business_name, business_type_id, owner_id, city_id, full_address, description, payment_status, status } = req.body;

  try {
    const updatedBusiness = await BusinessRegistration.findByIdAndUpdate(
      id,
      { business_name, business_type_id, owner_id, city_id, full_address, description, payment_status, status },
      { new: true }
    );

    res.status(200).json({ message: "Business updated successfully", business: updatedBusiness });
  } catch (error) {
    res.status(500).json({ message: "Error updating business", error });
  }
};

// Delete a business registration
export const deleteBusiness = async (req, res) => {
  const { id } = req.params;

  try {
    await BusinessRegistration.findByIdAndDelete(id);
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting business", error });
  }
};

// Approve business function with automatic reversion after 10 minutes
export const approveBusiness = async (req, res) => {
  const { id } = req.params;

  try {
    const business = await BusinessRegistration.findByIdAndUpdate(
      id,
      { status: "Approved", approvedAt: new Date() },
      { new: true }
    );

    res.status(200).json({ message: "Business approved successfully", business });
  } catch (error) {
    res.status(400).json({ message: "Error approving business", error });
  }
};
