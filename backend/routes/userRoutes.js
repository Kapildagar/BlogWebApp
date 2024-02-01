import Router from "express";
import {registerUser,Loginuser, logoutUser, updateProfile} from "../controller/userController.js"
import { upload } from "../middleware/muter.middlerware.js";
const router=Router();
import Auth from "../middleware/Auth.middleware.js";


router.route('/register').post(
    upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }, 
    {
        name: "coverImage",
        maxCount: 1
    }
]),
registerUser)
router.route('/login').post(Loginuser)
router.route("/logout").post(Auth,logoutUser);
router.route("/updateprofile").post(Auth,updateProfile)
export default router;
