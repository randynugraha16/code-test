import { Account } from "../../models/account.js";
import cryptojs from "crypto-js";
import jwt from "jsonwebtoken";
import { config } from "../../config/index.js";

export const controller = {
  getAccount: async (req, res, next) => {
    try {
      const data = await Account.find();

      res.json({
        status: 200,
        message: "OK",
        data,
      });
    } catch (e) {
      next(e.message);
    }
  },

  getAccountByAccountNumber: async (req, res, next) => {
    try {
      const { account } = req;

      const data = await Account.findOne({ _id: account._id });

      res.json({
        status: 200,
        message: "OK",
        data: {
          userName: data.userName,
          emailAddress: data.emailAddress,
          accountNumber: data.accountNumber,
        },
      });
    } catch (e) {
      next(e.message);
    }
  },

  getAccountByIndentityNumber: async (req, res, next) => {
    try {
      const { account } = req;

      const data = await Account.findOne({ _id: account._id });

      res.json({
        status: 200,
        message: "OK",
        data: {
          userName: data.userName,
          emailAddress: data.emailAddress,
          identityNumber: data.identityNumber,
        },
      });
    } catch (e) {
      next(e.message);
    }
  },

  updateAccount: async (req, res, next) => {
    try {
      const { account } = req;
      const { userName, emailAddress, identityNumber } = req.body;
      const data = await Account.findOne({ _id: account._id });

      if (!data) {
        return res.json({ status: 404, message: "Account Not Found" });
      }

      data.userName = userName;
      data.emailAddress = emailAddress;
      data.identityNumber = identityNumber;
      await data.save();

      res.json({ status: 200, message: "OK" });
    } catch (e) {
      e.status = 400;
      next(e);
    }
  },

  deleteAccount: async (req, res, next) => {
    try {
      const { account } = req;

      await Account.deleteOne({ _id: account._id });
      res.json({ status: 200, message: "OK" });
    } catch (e) {
      e.status = 400;
      next(e);
    }
  },
};
