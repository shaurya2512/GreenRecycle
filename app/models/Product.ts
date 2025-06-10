import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
      name: { type: String, required: true },
      description: String,
      imageUrl: String,
      pointsRequired: { type: Number, required: true },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
