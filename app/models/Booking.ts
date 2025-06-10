import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, required: true },
      userEmail: String,
      recycleItem: String,
      recycleItemPrice: Number,
      pickupDate: String,
      pickupTime: String,
      facility: String,
      fullName: String,
      address: String,
      phone: Number,
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
