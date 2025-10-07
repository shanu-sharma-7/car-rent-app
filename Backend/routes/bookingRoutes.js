import express from 'express'
import authMiddleware from '../middlewares/auth.js'
import {createBooking, deleteBooking, getBookings, getMyBookings, updateBooking, updateBookingStatus } from '../controllers/bookingController.js'
import { uploads } from '../middlewares/uploads.js';

const bookingRouter = express.Router();

// 🔥 FIX: uploads.single('carImage') middleware ko remove kiya
bookingRouter.post('/', authMiddleware, createBooking) 

bookingRouter.get('/', getBookings)
bookingRouter.get('/bybooking', authMiddleware, getMyBookings)
// NOTE: PUT route par Multer rehne diya agar carImage update ho raha ho.
bookingRouter.put('/:id', uploads.single('carImage'), updateBooking)
bookingRouter.patch('/:id/status', updateBookingStatus)
bookingRouter.delete('/:id', deleteBooking)

export default bookingRouter;