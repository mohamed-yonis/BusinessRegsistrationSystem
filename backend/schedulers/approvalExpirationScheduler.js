// schedulers/approvalExpirationScheduler.js
import cron from "node-cron";
import BusinessRegistration from "../models/BusinessRegistration.js";

// Schedule a job every minute to check for expired approvals
cron.schedule('*/1 * * * *', async () => {
  try {
    // Define expiration time as 1 minutes (600,000 milliseconds)
    const expirationTime = 1* 60 * 1000;
    const currentTime = new Date();

    // Find all businesses that are approved and have exceeded the 10-minute window
    const expiredBusinesses = await BusinessRegistration.find({
      status: "Approved",
      
      approvedAt: { $lte: new Date(currentTime - expirationTime) },
    });
    console.log("time" ,new Date(currentTime - expirationTime))
    // Update the status of expired businesses to "Pending"
    await Promise.all(
      expiredBusinesses.map(async (business) => {
        business.status = "Pending";
        business.approvedAt = null;
        await business.save();
      })
    );

    console.log(`${expiredBusinesses.length} businesses set back to pending status.`);
  } catch (error) {
    console.error("Error resetting expired approvals:", error);
  }
});
