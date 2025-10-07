import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://shanusharma7217_db_user:shanu123@cluster0.hqaosnx.mongodb.net/CarRental').then(() => console.log('DB connected'))
}