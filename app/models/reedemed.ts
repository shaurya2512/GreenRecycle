import mongoose, { Schema, models } from "mongoose";

const redeemedSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		productId: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Redeemed = models.Redeemed || mongoose.model("Redeemed", redeemedSchema);

export default Redeemed;
