import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
      name: String,
      address: String,
      coordinates: {
            lat: Number,
            lng: Number,
      },
      // Add any other fields as needed
});

export default mongoose.models.Facility || mongoose.model("Facility", facilitySchema);
