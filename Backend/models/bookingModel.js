import mongoose from "mongoose";
import Car from "./carModel.js";

const {Schema} = mongoose;


const addressSchema = new Schema(
  { street: String, city: String, state: String, zipCode: String },
  { _id: false, default: {} }
);


const carSummarySchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    make: { type: String, default: "" },
    model: { type: String, default: "" },
    year: Number,
    dailyRate: { type: Number, default: 0 },
    category: { type: String, default: "Sedan" },
    seats: { type: Number, default: 4 },
    transmission: { type: String, default: "" },
    fuelType: { type: String, default: "" },
    mileage: { type: Number, default: 0 },
    image: { type: String, default: "" },
  },
  { _id: false }
);

const bookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    customer: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: "" },
    car: { type: carSummarySchema, required: true },
    carImage: { type: String, default: "" },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    bookingDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed', 'cancelled', 'upcoming'],
      default: 'pending',
    },
    amount: { type: Number, default: 0 },
    details: { type: Schema.Types.Mixed, default: {} },
    address: { type: addressSchema, default: {} },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    paymentIntentId: { type: String, default: '' },
    paymentDetails: { type: Schema.Types.Mixed, default: {} },
    sessionId: { type: String, default: '' },
  },
  { timestamps: true }
);

// 🔥 FIX: post('save') hook HATA diya gaya hai, kyunki yeh transaction ko tod raha tha.
// Car update logic ab sirf bookingController.js mein transaction ke andar hai.

// 🔥 FIX: post('remove') hook HATA diya gaya hai, iski functionality deleteBooking controller mein daal di gayi hai.

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;