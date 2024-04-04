
import {Router} from 'express'
import { handleBooking } from '../controller/booking.controller.js'

const router=Router()

router.post('/createbooking',handleBooking)


export default router