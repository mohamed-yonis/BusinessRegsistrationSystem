// server.js
import express from "express";
import ConnectDb from "./config/db.js";
import { port } from "./config/config.js";
import cors from "cors";

// Import routes and controllers with .js extensions
import authRoutes from "./routes/authroutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import { getAllUsers, createUser } from "./controllers/userController.js";
import {
  getAllBusinesses,
  createBusiness,
} from "./controllers/businessRegistrationController.js";
import { getAllRoles, createRole } from "./controllers/roleController.js";
import {
  getAllBusinessTypes,
  createBusinessType,
} from "./controllers/businessTypeController.js";
import { getAllOwners, createOwner } from "./controllers/ownerController.js";
import { getAllCities, createCity } from "./controllers/cityController.js";
// import {
//   getAllPayments,
//   createPayment,
// } from "./controllers/paymentController.js";
import cityRoutes from "./routes/cityRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import businessTypeRoutes from "./routes/businessTypeRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import { fileURLToPath } from "url";
import businessRoutes from "./routes/businessRegistrationRoutes.js";
import ministryRoutes from "./routes/ministryRoutes.js";
import "./schedulers/approvalExpirationScheduler.js"; // Import the scheduler
import paymentRoutes from './routes/paymentRoutes.js';

import path from "path";
// app.js
import { sendSMS } from "./sendSMS.js";

// Call the sendSMS function
sendSMS("Hello, this is a test message from Node.js!", "+252616689824");

// Initialize app and middleware
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
ConnectDb();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/api/payment', paymentRoutes);

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads")); // Serve static files from uploads folder

app.use("/api/owners", ownerRoutes);
app.use("/api/businesses", businessRoutes); //
// Direct routes for CRUD
app.get("/users", getAllUsers);
app.post("/users", createUser);
app.use("/api/ministry", ministryRoutes);

app.get("/businesses", getAllBusinesses);
app.post("/businesses", createBusiness);
app.use("/api/business-types", businessTypeRoutes);

app.get("/roles", getAllRoles);
app.post("/roles", createRole);
app.use("/api/cities", cityRoutes);
app.get("/business-types", getAllBusinessTypes);
app.post("/business-types", createBusinessType);

app.get("/owners", getAllOwners);
app.post("/owners", createOwner);

app.get("/cities", getAllCities);
app.post("/cities", createCity);

// app.get("/payments", getAllPayments);
// app.post("/payments", createPayment);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
