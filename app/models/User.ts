import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
      fullName: { type: String, required: true },
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      phoneNumber: { type: String, required: true },
      password: { type: String, required: true },
      role: { type: String, default: "user" },
      points: { type: Number, default: 0 },
      redeemedProducts: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Product",
            }
      ]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
