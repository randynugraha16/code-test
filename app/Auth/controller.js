import { Account } from "../../models/account.js";
import pkg from "crypto-js";
const { HmacSHA256 } = pkg;
import jwt from "jsonwebtoken";
import { config } from "../../config/index.js";

export const controller = {
  loginAccount: async (req, res, next) => {
    try {
      const { userName, password } = req.body;

      const account = await Account.findOne({ userName });

      if (!account) {
        return res.json({ status: 404, message: "Account Not Found" });
      }

      const hashPassword = HmacSHA256(password, config.HASH_KEY).toString();

      if (hashPassword === account.password) {
        const token = jwt.sign(
          {
            account: {
              id: account._id,
              userName: account.userName,
              emailAddress: account.emailAddress,
            },
          },
          config.HASH_KEY
        );

        res.json({
          status: 200,
          message: "OK",
          token,
        });
      } else {
        return res.json({ status: 403, message: "Wrong Password" });
      }
    } catch (e) {
      next(e.message);
    }
  },

  registerAccount: async (req, res, next) => {
    try {
      await Account.create(req.body);
      res.json({ status: 201, message: "OK" });
    } catch (e) {
      e.status = 400;
      next(e);
    }
  },
};
