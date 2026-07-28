import express from "express";
import cors from "cors";
import ProfileRoute from "./routes/profile.route.js";
import EventRoute from "./routes/event.route.js";
import { env } from "./config/env.config.js";
import { connectDB } from "./config/db.config.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

const app = express();

app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json());

const eventRoutes = new EventRoute();
const profileRoutes = new ProfileRoute();

app.use("/", eventRoutes.router);
app.use("/", profileRoutes.router);

app.use(errorHandlerMiddleware);

connectDB()
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`Server running at PORT ${env.PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
    console.log("Error connecting to database.");
  });
