import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    images: { type: [String], required: true },
    description: { type: String, required: true },
    specifications: [
        {
            name: { type: String, required: true },
            value: { type: String, required: true }
        }
    ],
    features: { type: [String], default: [] },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Product = mongoose.model('Product', productSchema);
export default Product;