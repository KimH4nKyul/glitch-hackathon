import { ethers } from "ethers";

export const provider = new ethers.providers.Web3Provider(window.ethereum);

export const providerContract = (contractAddress, abi) => {
	const contract = new ethers.Contract(contractAddress, abi, provider);
	return contract;
};

export const signerContract = (contractAddress, abi) => {
	const contract = new ethers.Contract(
		contractAddress,
		abi,
		provider.getSigner()
	);
	return contract;
};
