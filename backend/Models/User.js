import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Array, default: [] },
    role: { type: String, enum: ['customer', 'seller']},
})

const User = mongoose.model('User', userSchema);
export default User;