import { Request, Response } from "express";
import mongoose from "mongoose";
import TaskModel from "../Model/TaskModel";
import UserModel from "../Model/UserModel";

const getTask = async (req: Request, res: Response) => {
	await TaskModel.find();
	res.status(200).json({
		message: "found",
	});
};
const getSingleTask = async (req: Request, res: Response) => {
	const myTask = await TaskModel.findById(req.params.id);
	res.status(200).json({
		message: "found",
		data: myTask,
	});
};

const CreateTask = async (req: Request, res: Response): Promise<Response> => {
	try {
		const getUser = await UserModel.findById(req.params.userID);

		if (getUser) {
			const { title, date } = req.body;

			let myDate1 = new Date().toDateString();

			const creatingTask = await TaskModel.create({
				title,
				date: date ? date : myDate1,
				remainder: "",
				status: false,
				note: "",
				sender: "",
				reciever: "",
			});

			await getUser?.myDay?.push(
				new mongoose.Types.ObjectId(creatingTask!._id),
			);
			await getUser?.task?.push(new mongoose.Types.ObjectId(creatingTask!._id));

			getUser.save();

			return res.status(200).json({
				message: "success",
				data: creatingTask,
			});
		} else {
			return res.status(404).json({
				message: "user not found",
			});
		}
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred While Creating task",
		});
	}
};

const CompleteTask = async (req: Request, res: Response) => {
	try {
		const getUser = await UserModel.findById(req.params.userID);

		if (getUser) {
			const completed = await TaskModel.findByIdAndUpdate(
				req.params.TaskID,
				{
					status: true,
				},
				{
					new: true,
				},
			);
			return res.status(200).json({
				message: "updated successfully",
				data: completed,
			});
		} else {
			return res.status(400).json({
				message: "Access Denied",
			});
		}
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred While Creating task",
		});
	}
};
const UnCompleteTask = async (req: Request, res: Response) => {
	try {
		const getUser = await UserModel.findById(req.params.userID);

		if (getUser) {
			const completed = await TaskModel.findByIdAndUpdate(
				req.params.TaskID,
				{
					status: false,
				},
				{
					new: true,
				},
			);
			return res.status(200).json({
				message: "updated successfully",
				data: completed,
			});
		} else {
			return res.status(400).json({
				message: "Access Denied",
			});
		}
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred While Creating task",
		});
	}
};
const UpdateTask = async (req: Request, res: Response) => {
	try {
		const { note, title } = req.body;

		const completed = await TaskModel.findByIdAndUpdate(
			req.params.id,
			{
				note: note,
				title: title,
			},
			{
				new: true,
			},
		);
		return res.status(200).json({
			message: "updated successfully",
			data: completed,
		});
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred While Creating task",
		});
	}
};

const AssignTask = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const getUser = await UserModel.findOne({ email: email });
		const getSender = await UserModel.findById(req.params.id);

		if (getUser && getSender) {
			const assignedData = await TaskModel.findById(req.params.taskID);
			console.log(assignedData);
			const userTask = await TaskModel.findByIdAndUpdate(
				assignedData?._id,
				{
					sender: getSender?.name,
					reciever: getUser?.name,
				},
				{
					new: true,
				},
			);
			getUser?.assigned?.push(assignedData?._id);
			await getUser?.save();

			return res.status(200).json({
				message: "successFull",
				data: userTask,
			});
		} else {
			return res.status(404).json({
				message: "user does not exist",
			});
		}
	} catch (err) {
		return res.status(404).json({
			message: "an error occurred While Creating task",
		});
	}
};

export {
	CreateTask,
	getTask,
	CompleteTask,
	UnCompleteTask,
	getSingleTask,
	UpdateTask,
	AssignTask,
};
