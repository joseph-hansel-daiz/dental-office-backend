import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { sequelize } from "./models";

// Routes
import appointmentRoutes from "./routes/appointments";
import authRoutes from "./routes/auth";
import dentistRoutes from "./routes/dentists";
import scheduleRoutes from "./routes/schedules";
import serviceRoutes from "./routes/services";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://a4f4b374d524647e5992af36faa0f331-1120244756.ap-southeast-2.elb.amazonaws.com",
    ],
    credentials: true, // Allow cookies or authorization headers to be sent
  })
);

app.use(bodyParser.json());

// Mount routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/services", serviceRoutes);
app.use("/dentists", dentistRoutes);
app.use("/schedules", scheduleRoutes);
app.use("/appointments", appointmentRoutes);

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync({ alter: true }); // dev mode only, use migrations in prod
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Unable to start server:", err);
    process.exit(1);
  }
})();
