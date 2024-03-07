import  express  from "express";
import {addUser, deleteUser, getUserById, getAllUsers, updateUser, getAllUsersByCompany, getAllPresentUsersByCompany, getAllPresentTodayUsersByCompany} from "../controllers/UserController.js"
import { addInUser,addOutUser } from "../controllers/inoutController.js";

const router = express.Router()


router.get("", getAllUsers)
router.get("/company/:id_company", getAllUsersByCompany)
router.get("/:iduser", getUserById)
router.get("/present/:id_company",getAllPresentUsersByCompany)
router.get("/present/today/:id_company",getAllPresentTodayUsersByCompany)

router.post("/add",addUser)
router.post("/in/add",addInUser)
router.post("/out/add",addOutUser)
router.put("/update/:iduser",updateUser)

router.delete("/delete/:iduser",deleteUser)

export default router;