const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
      firstName: {
          type: String,
      },
      lastName: {
          type: String,
      },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ROLE_CLIENT", "ROLE_ADMIN", "ROLE_ASSISTANT"],
      required: true,
    },
      isDelete: {
          type: Boolean,
          default: false,
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
