import express from "express";
import {getTasks,createTask,deleteTask} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {updateTask} from "../controllers/taskController.js";



const router=express.Router();

router.get("/",authMiddleware,getTasks);
router.post("/",authMiddleware,createTask);
router.delete("/:id",authMiddleware,deleteTask);
router.put("/:id",authMiddleware,updateTask);


export default router;
