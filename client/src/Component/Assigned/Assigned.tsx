import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import styled from "styled-components";
import { GlobalContext } from "../Global/Global";

const Assigned = () => {
	const { currentUser, showDetail } = useContext(GlobalContext);

	const [userData, setUserData] = useState([] as any);

	const ReadMyDay = async () => {
		await axios
			.get(`http://localhost:5000/api/getOne/${currentUser?._id}`)
			.then((res) => {
				console.log(res);
				setUserData(res.data.data);
			});
	};

	useEffect(() => {
		ReadMyDay();
	}, []);

	return (
		<Container>
			{userData?.assigned?.length >= 1 ? (
				<>
					{userData?.assigned?.map((props: any) => (
						<InputHold2
							bc={props.status ? "#e3f7fe" : "white"}
							key={props._id}
							wd={showDetail ? "67%" : "90%"}>
							<Hol>
								<Input2
									checked={props.status}
									// onClick={() => {
									// 	if (props.status) {
									// 		updatingStatusFalse(props._id);
									// 	} else {
									// 		updatingStatus(props._id);
									// 	}
									// }}
									type='radio'
								/>
								<TitleHold>
									<Title td={props.status ? "line-through " : ""}>
										{props?.title}
									</Title>
									<Sub>
										<BiCalendar style={{ marginRight: "10px" }} />
										{/* {props.date} */}
										Due {props?.date}
									</Sub>
								</TitleHold>
							</Hol>
							<span>
								<AiOutlineStar />
								<div>{props?.sender}</div>
							</span>
						</InputHold2>
					))}
				</>
			) : (
				<>
					<BoxImag src='/img/2.svg' />
					<h3>Assigned Task to me</h3>
					<p>Task assigned to you in TO DO will show up here.</p>
				</>
			)}
		</Container>
	);
};

export default Assigned;

const DatePicker = styled.div`
	position: absolute;
	max-width: 250px;
	height: 70px;
	top: 40px;
`;

const TitleHold = styled.div`
	font-size: 12px;
	margin-left: 10px;
	flex: 1;
`;
const Sub = styled.div`
	font-size: 10px;
`;
const Title = styled.div<{ td: string }>`
	font-weight: 500;
	text-decoration: ${(props) => props.td};
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	max-width: 200px;
`;
const Hol = styled.div`
	display: flex;
	align-items: center;
`;
const First = styled.div`
	margin-left: 10px;
	cursor: pointer;
`;
const Button = styled.button`
	margin-right: 10px;
	height: 30px;
	width: 60px;
	background-color: white;
	border: 1px solid silver;
	outline: none;
	cursor: pointer;
`;

const Down = styled.div<{ wd: string }>`
	height: 40px;
	width: ${(props) => props.wd};
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
	border-radius: 0px 0px 5px 5px;
	position: relative;
`;

const InputHold2 = styled.div<{ wd: string; bc: string }>`
	width: ${(props) => props.wd};
	background-color: ${(props) => props.bc};
	height: 40px;
	display: flex;
	align-items: center;
	border-radius: 5px 5px 0px 0px;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
	justify-content: space-between;
	cursor: pointer;
	transition: all 350ms;
	margin-bottom: 10px;

	span {
		margin-right: 20px;
	}

	:hover {
		background-color: #e3f7fe;
	}
`;
const InputHold = styled.div<{ wd: string }>`
	width: ${(props) => props.wd};
	background-color: white;
	height: 40px;
	display: flex;
	align-items: center;
	border-radius: 5px 5px 0px 0px;
	box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
`;

const Input2 = styled.input`
	border-color: 1px solid blue;
	margin-left: 10px;
`;
const Input = styled.input`
	border: none;
	outline: none;
	flex: 1;

	::placeholder {
		padding-left: 5px;
	}
`;

const Main = styled.div`
	display: flex;
	align-items: center;
`;
const IconHold = styled.div`
	font-size: 20px;
	margin-right: 10px;
	margin-top: 25px;
`;
const BoxImag = styled.img`
	height: 120px;
`;

const Container = styled.div`
	min-width: calc(100vw - 230px);
	min-height: calc(100vh - 50px);

	display: flex;
	overflow: hidden;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #faf9f8;
	/* flex-direction: column; */
`;
