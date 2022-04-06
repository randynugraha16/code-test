import mongoose from "mongoose";
import crypto from "crypto-js";
import { config } from "../config/index.js";

const accountSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username Required"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password Required"],
    },
    accountNumber: {
      type: String,
      unique: true,
      default: Math.floor(Date.now() / 1000 + Math.random() * 900000000),
      index: true,
    },
    emailAddress: {
      type: String,
      required: [true, "Email Required"],
    },
    identityNumber: {
      type: String,
      required: [true, "Identity Number Required"],
      index: true,
    },
    status: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.path("emailAddress").validate(
  async (value) => {
    try {
      const count = await mongoose.model("account").countDocuments({
        emailAddress: value,
      });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} Allready Exist`
);

accountSchema.path("userName").validate(
  async (value) => {
    try {
      const count = await mongoose.model("account").countDocuments({
        userName: value,
      });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} Allready Exist`
);

accountSchema.path("identityNumber").validate(
  async (value) => {
    try {
      const count = await mongoose.model("account").countDocuments({
        identityNumber: value,
      });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} Allready Exist`
);

accountSchema.pre("save", function (next) {
  this.password = crypto.HmacSHA256(this.password, config.HASH_KEY).toString();
  next();
});

export const Account = mongoose.model("account", accountSchema);
