import { useState } from "react";
import useRecords from "../hooks/contracts/useRecords";
import QRCode from "react-qr-code";
import DayjustSilver from "../asset/dayjust-silver.png";
import SubmarinerGreen from "../asset/submariner-green.png";

const contractAddress = "0x1C6F250Fed55f6D20910319DaC89Cc33D401F179";

export default function RecordBoard() {
	const [open, setOpen] = useState(false);
	const [colorInput, setColorInput] = useState("");
	const [madeDateInput, setMadeDateInput] = useState("");
	const [modelInput, setModelInput] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	// const { supplier } = useSupplier();
	const { records, uploadRecord } = useRecords(contractAddress);
	const handleQRButtonClick = () => {
		setOpen(true);
	};

	return (
		<div className="container mx-auto">
			<h1 className="text-4xl font-bold m-4">Verified Rollies</h1>
			<div className="flex m-3">
				<button
					onClick={handleQRButtonClick}
					className="border border-gray-300 rounded-md px-3 py-2 ml-2 w-full"
				>
					Register
				</button>
			</div>
			<div className="m-3 grid grid-cols-2 mt-4 justify-center">
				{records.map((record, index) => (
					<div
						key={record.recordId}
						className="flex flex justify-center items-center m-3"
					>
						<div className="card h-96 w-96 bg-base-100 shadow-xl">
							<figure className="h-48">
								<img
									src={
										record.info.model === "dayjust" ||
										record.info.model === "galaxy"
											? DayjustSilver
											: SubmarinerGreen
									}
								/>
							</figure>
							<div className="p-3 h-52">
								<p>model: {record.info.model}</p>
								<p>color: {record.info.color}</p>
								<p>made date: {record.info.madeAt}</p>
								<br />
								<p>registered date: {record.date}</p>
							</div>
						</div>
					</div>
				))}
			</div>
			{open && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
					<div className="w-full m-3 bg-white p-2 rounded-md grid gap-3">
						<select
							onChange={(e) => setModelInput(e.target.value)}
							value={modelInput}
							className="border border-gray-300 rounded-md px-3 py-2 w-full"
							id="outlined-basic"
							placeholder="model"
						>
							<option value="submariner">submariner</option>
							<option value="daytona">daytona</option>
							<option value="dayjust">dayjust</option>
						</select>
						<select
							onChange={(e) => setColorInput(e.target.value)}
							value={colorInput}
							className="border border-gray-300 rounded-md px-3 py-2 w-full"
							id="outlined-basic"
							placeholder="color"
						>
							<option value="silver">silver type</option>
							<option value="green">green type</option>
							<option value="red">red type</option>
							<option value="blue">blue type</option>
							<option value="black">black type</option>
						</select>
						<input
							onChange={(e) => setMadeDateInput(e.target.value)}
							type="date"
							value={madeDateInput}
							className="border border-gray-300 rounded-md px-3 py-2 w-full"
							id="outlined-basic"
							placeholder="Message"
						/>
						{!isVerified && (
							<QRCode
								style={{ margin: "auto" }}
								onClick={() => setIsVerified(!isVerified)}
								value={`{"id":"1a54fd97-691e-42c4-9b03-5d412f8823e4","typ":"application/iden3comm-plain-json","type":"https://iden3-communication.io/authorization/1.0/request","thid":"1a54fd97-691e-42c4-9b03-5d412f8823e4","body":{"callbackUrl":"https://self-hosted-demo-backend-platform.polygonid.me/api/callback?sessionId=70520","reason":"test flow","scope":[]},"from":"did:polygonid:polygon:mumbai:2qLhNLVmoQS7pQtpMeKHDqkTcENBZUj1nkZiRNPGgV"}`}
							/>
						)}
						{isVerified && (
							<div className="m-3" style={{ color: "black", fontSize: "20px" }}>
								Verified!
							</div>
						)}
						<button
							onClick={() => {
								if (!isVerified) setOpen(false);
								if (isVerified) {
									console.log(
										JSON.stringify({
											color: colorInput,
											model: modelInput,
											madeAt: madeDateInput,
										})
									);
									uploadRecord(
										JSON.stringify({
											color: colorInput,
											model: modelInput,
											madeAt: madeDateInput,
										})
									);
									setOpen(false);
								}
							}}
							className="btn btn-primary mt-4"
						>
							{isVerified ? "Register" : "Close"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
