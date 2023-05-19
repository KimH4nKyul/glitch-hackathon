import { useState } from "react";
import useOnMount from "../common/useOnMount";
import { providerContract, signerContract } from "./util/wallet";
import SupplyChain from "../../contracts/SupplyChain.sol/SupplyChain.json";

const useRecords = (address) => {
	const [records, setRecords] = useState([]);

	useOnMount(() => {
		readRecords().catch(console.error);
	});

	const readRecords = async () => {
		const contract = signerContract(address, SupplyChain.abi);
		try {
			// const recordCount = await contract.getRecordCount();
			// const records = [];
			// for (let i = 0; i < recordCount; i += 1) {
			// 	const record = await contract.getRecord(recordCount);
			// 	records.push(record);
			// 	console.log(records);
			// }
			setRecords([
				{ date: "2023-05", message: "sent to china" },
				{ date: "2023-05", message: "sent to china" },
			]);
		} catch (err) {
			alert(
				"Switch your MetaMask network to Polygon zkEVM testnet and refresh this page!"
			);
		}
	};

	const uploadRecord = async (message) => {
		const contract = signerContract(address, SupplyChain.abi);
		const transaction = await contract.addRecord(message);
		await transaction.wait();
		readRecords();
	};

	return { records, uploadRecord };
};

export default useRecords;
