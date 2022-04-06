import jwt from "jsonwebtoken";
import { Account } from "../models/account.js";
import { config } from "../config/index.js";

export const middleware = {
  isLogin: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return res.json({
          status: 403,
          message: "Login First",
        });
      }

      const data = jwt.verify(token, config.HASH_KEY);

      const account = await Account.findOne({ _id: data.account.id });

      if (!account) {
        return res.json({
          status: 404,
          message: "Account Not Found",
        });
      }

      req.account = account;
      req.token = token;
      next();
    } catch (e) {
      e.status = 400;
      next(e.message);
    }
  },

  checkKey: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return res.json({
          status: 403,
          message: "Api Key required",
        });
      }

      if (token !== "asd78687asd7896as9d69asdasdygewaf765") {
        return res.json({
          status: 403,
          message: "Invalid Api Key",
        });
      }

      req.token = token;
      next();
    } catch (e) {
      e.status = 400;
      next(e.message);
    }
  },
};
