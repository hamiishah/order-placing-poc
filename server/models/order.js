const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        card: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: [
                "Pending",
                "Cancelled",
                "Accepted",
                "Rejected",
            ],
            default: "Pending"
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "Account",
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "Account",
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema);
