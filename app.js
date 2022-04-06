import express from "express";
import { config } from "./config/index.js";
import "./models/index.js";
import "./kafka/consumer.js";
import { authRoutes } from "./app/Auth/routes.js";
import { accountRoutes } from "./app/Account/routes.js";
import { apiRoutes } from "./app/Api/routes.js";
import { middleware } from "./middleware/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));

app.use("/auth", authRoutes);
app.use("/account", middleware.isLogin, accountRoutes);
app.use("/api", middleware.checkKey, apiRoutes);

app.use((req, res) => {
  return res.json({
    status: 404,
    message: "Invalid Routes",
  });
});

app.use(function (err, req, res, next) {
  const message =
    config.ENV === "DEVELOPMENT" ? err.message : "Internal Server Error";

  res.json({ status: err.status ?? 500, message });
});

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
