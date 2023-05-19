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
			const { data } = JSON.parse(await contract.getRecords());
			console.log(data);
			setRecords(data);
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
