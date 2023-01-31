import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineBell } from "react-icons/ai";
import { CiRepeat } from "react-icons/ci";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TiAttachment } from "react-icons/ti";
import { BiCalendar } from "react-icons/bi";
import { GlobalContext } from "../Global/Global";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";

const DetailsComp = () => {
	const { toggleShow, readID } = useContext(GlobalContext);
	const [taskData, setTaskData] = useState({} as any);
	const [note, setNote] = useState(taskData?.note);
	const [title, setTitle] = useState(taskData?.title);
	const [showAssigned, setShowAssigned] = useState(false);

	const ChangeState = () => {
		setShowAssigned(!showAssigned);
	};

	const getSingleTask = async () => {
		await axios
			.get(`http://localhost:5000/api/task/singleTask/${readID}`)
			.then((res) => {
				console.log(res);
				setTaskData(res.data.data);
			});
	};

	const updatingTask = async () => {
		await axios
			.patch(`http://localhost:5000/api/task/updateTask/${readID}`, {
				title,
				note,
			})
			.then((res) => {
				console.log(res);
				window.location.reload();
			});
	};

	useEffect(() => {
		getSingleTask();
	}, [readID]);

	return (
		<Cont>
			<MainCont>
				<Card>
					<IconHold>
						<input
							defaultValue={taskData?.title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
							type=''
						/>
					</IconHold>
				</Card>
				<Card>
					<IconHold>
						<BiCalendar />
					</IconHold>
					<span>Due {taskData?.date}</span>
				</Card>
				<Card>
					<IconHold>
						<AiOutlineBell />
					</IconHold>
					<span>Remaind Me</span>
				</Card>
				<Card>
					<IconHold>
						<CiRepeat />
					</IconHold>
					<span>Repeat</span>
				</Card>
				<Card>
					<IconHold>
						<FaRegUserCircle />
					</IconHold>
					<span style={{ cursor: "pointer" }} onClick={ChangeState}>
						Assigned Task
					</span>
					{showAssigned ? (
						<UserAssignCard>
							<input placeholder='Enter user Email ' />
							<button>Assign Task</button>
						</UserAssignCard>
					) : null}
				</Card>
				<Card>
					<IconHold>
						<TiAttachment />
					</IconHold>
					<span>Add File</span>
				</Card>
				<Card
					style={{
						flex: 1,
					}}>
					<Hol>
						<textarea
							onChange={(e) => {
								setNote(e.target.value);
							}}
							defaultValue={taskData?.note}
							placeholder='Edited...'
						/>
						<button onClick={updatingTask}>Update</button>
						<span>Sunday, January 15</span>
					</Hol>
				</Card>
			</MainCont>
		</Cont>
	);
};

export default DetailsComp;

const UserAssignCard = styled.div`
	position: absolute;
	height: 100px;
	width: 230px;
	top: 40px;
	background-color: white;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

	button {
		background-color: #8a8aff;
		height: 30px;
		width: 120px;
		color: white;
		outline: none;
		border: none;
	}

	input {
		height: 30px;
		width: 80%;
		margin-bottom: 10px;
		padding-left: 10px;
	}
`;

const Hol = styled.div`
	display: flex;
	flex-direction: column;

	span {
		font-size: 10px;
	}
`;

const IconHold = styled.div`
	margin-right: 10px;

	input {
		border: none;
		outline: none;
		height: 100%;
		width: 100%;
	}
`;
const MainCont = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	/* justify-content: center; */
	margin-top: 70px;
	flex-direction: column;
	align-items: center;
`;
const Card = styled.div`
	height: 40px;
	width: 90%;
	background-color: white;
	display: flex;
	align-items: center;
	padding-left: 10px;
	border-radius: 5px;
	margin-bottom: 10px;
	position: relative;

	textarea {
		/* flex: 1; */
		min-height: 200px;
		outline: none;
		border: none;
		resize: none;
		width: 230px;
	}
`;

const Cont = styled.div`
	height: 100vh;
	position: fixed;
	/* background-color: white; */
	width: 300px;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
