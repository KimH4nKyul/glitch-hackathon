import { useState } from "react";
import Counter from "../../../contracts/Counter.sol/Counter.json";
import useOnMount from "../../common/useOnMount";
import { providerContract, signerContract } from "../util/wallet";

export default function useCounter(counterAddress) {
	const [count, setCount] = useState(0);

	useOnMount(() => {
		const fetchCount = async () => {
			const data = await readCounterValue();
			return data;
		};
		fetchCount().catch(console.error);
	});

	async function readCounterValue() {
		const contract = providerContract(counterAddress, Counter.abi);
		try {
			const data = await contract.retrieve();
			setCount(parseInt(data.toString()));
		} catch (err) {
			alert(
				"Switch your MetaMask network to Polygon zkEVM testnet and refresh this page!"
			);
		}
	}

	const decreaseCounter = async () => {
		const contract = signerContract(counterAddress, Counter.abi);
		const transaction = await contract.decreasement();
		await transaction.wait();
		readCounterValue();
	};

	const incrementCounter = async () => {
		const contract = signerContract(counterAddress, Counter.abi);
		const transaction = await contract.increment();
		await transaction.wait();
		readCounterValue();
	};

	return { count, incrementCounter, decreaseCounter };
}
