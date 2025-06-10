import mongoose from "mongoose";

const OthersRecycleSchema = new mongoose.Schema(
      {
            deviceType: { type: String, required: true },
            deviceCompanyOrModel: { type: String, required: true },
            recycleItemPrice: { type: Number, required: true },
            pickupDate: { type: String, required: true },
            pickupTime: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            selectedFacility: { type: String, required: true },
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      },
      { timestamps: true }
);

export default mongoose.models.OthersRecycle ||
      mongoose.model("OthersRecycle", OthersRecycleSchema);
