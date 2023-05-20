//design
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//state
import { useState } from "react";
import useSupplier from "../hooks/contracts/useSupplier";
import useRecords from "../hooks/contracts/useRecords";
import QRCode from "react-qr-code";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "start",
	height: "50px",
	overflow: "scroll",
	color: theme.palette.text.secondary,
}));
const contractAddress = "0x720B5bCE9DaA428Fb8E4Cd311b9a3d7a14e5094d";
export default function RecordBoard() {
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");
	const { supplier } = useSupplier();
	const { records, uploadRecord } = useRecords(contractAddress);

	return (
		<Container>
			<h1>{supplier}</h1>
			<div style={{ display: "flex" }}>
				<TextField
					onChange={(e) => setInput(e.target.value)}
					value={input}
					sx={{ width: "85%" }}
					id="outlined-basic"
					label="Message"
					variant="outlined"
				/>
				<Button
					onClick={async () => {
						await uploadRecord(input);
						setInput("");
					}}
					sx={{ margin: "0 5px", width: "15%" }}
					variant="outlined"
				>
					push
				</Button>
			</div>

			<Box
				sx={{
					flexGrow: 1,
					marginTop: "1rem",
				}}
			>
				<Grid container spacing={3}>
					{records.map((record) => (
						<Grid key={record.recordId} item xs={6}>
							<Item>
								{record.date} <br />
								{record.message}
							</Item>
						</Grid>
					))}
				</Grid>
			</Box>
			<Button
				onClick={() => setOpen(true)}
				sx={{
					position: "fixed",
					bottom: 0,
					right: 0,
					width: "120px",
					height: "120px",
					margin: "10px",
				}}
				variant="outlined"
			>
				QR
			</Button>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalBoxStyle}>
					<QRCode value="www.naver.com" />
				</Box>
			</Modal>
		</Container>
	);
}

const modalBoxStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};
