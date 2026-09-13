import express from 'express'
import { getCurrentUser, updateProfile, getProfile, getSuggestedUser } from '../controllers/user.controllers.js'
import isAuth from '../middlewares/isAuth.js'
import upload from "../middlewares/multer.js"
import { search } from '../controllers/user.controllers.js'

let userRouter = express.Router()

userRouter.get("/currentuser",isAuth, getCurrentUser)
userRouter.put("/updateprofile",isAuth,upload.fields([
    {name:"profileImage", maxCount:1},
    {name:"coverImage", maxCount:1}
]), updateProfile)
userRouter.get("/profile/:userName",isAuth, getProfile)
userRouter.get("/search",isAuth, search)
userRouter.get("/suggestedusers",isAuth, getSuggestedUser)

export default userRouter