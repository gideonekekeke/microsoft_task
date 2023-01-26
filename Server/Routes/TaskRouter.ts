import { CreateTask, getTask } from "../Controller/TaskController";
import express from "express";
const router = express.Router();

router.route("/createTask/:userID").post(CreateTask);

export default router;
