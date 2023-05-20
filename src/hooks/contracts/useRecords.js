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
		const contract = providerContract(address, SupplyChain.abi);
		try {
			const recordCount = await contract.getRecordCount();
			const records = [];
			for (let i = 0; i < recordCount; i += 1) {
				const record = await contract.getRecord(i);
				console.log(record[2]);
				records.push({
					recordId: Number(BigInt(record[0])),
					date: new Date(Number(BigInt(record[2])) * 1000).toString(),
					message: record[1],
				});
			}
			setRecords(records);
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
