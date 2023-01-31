import {
	CreateTask,
	getTask,
	CompleteTask,
	UnCompleteTask,
	getSingleTask,
	UpdateTask,
	AssignTask,
} from "../Controller/TaskController";
import express from "express";
const router = express.Router();

router.route("/createTask/:userID").post(CreateTask);
router.route("/completeTask/:userID/:TaskID").patch(CompleteTask);
router.route("/uncompleteTask/:userID/:TaskID").patch(UnCompleteTask);
router.route("/singleTask/:id").get(getSingleTask);
router.route("/updateTask/:id").patch(UpdateTask);
router.route("/assigned/:id/:taskID").patch(AssignTask);

export default router;
