
import { Router } from "express";
import { getTripList,addWishList,getPropertyList,getReservationList } from "../controller/user.controller.js";

const router=Router()

/* GET TRIP LIST */
router.get("/:userId/trips", getTripList)
  
  /* ADD LISTING TO WISHLIST */
  router.patch("/:userId/:listingId",addWishList )
  
  /* GET PROPERTY LIST */
  router.get("/:userId/properties", getPropertyList)
  
  /* GET RESERVATION LIST */
  router.get("/:userId/reservations",getReservationList )


export default router