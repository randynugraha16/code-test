import { Account } from "../../models/account.js";

export const controller = {
  getAccountByAccountNumber: async (req, res) => {
    try {
      const data = await Account.findOne({ accountNumber: req.params.id });

      if (!data) {
        return res.json({
          status: 404,
          message: "Account Not Found",
        });
      }

      res.json({
        status: 200,
        message: "OK",
        data,
      });
    } catch (e) {
      next(e.message);
    }
  },

  getAccountByIndentityNumber: async (req, res) => {
    try {
      const data = await Account.findOne({ identityNumber: req.params.id });

      if (!data) {
        return res.json({
          status: 404,
          message: "Account Not Found",
        });
      }

      res.json({
        status: 200,
        message: "OK",
        data,
      });
    } catch (e) {
      next(e.message);
    }
  },
};
