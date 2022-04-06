import mongoose from "mongoose";
import { config } from "../config/index.js";

mongoose
  .connect(`mongodb://${config.IP_MONGO}/${config.DB_MONGO}`, {
    useNewUrlParser: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => {
    console.log(err);
  });
