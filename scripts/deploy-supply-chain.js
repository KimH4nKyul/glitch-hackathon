const hre = require("hardhat");

async function main() {
	const ContractFactory = await hre.ethers.getContractFactory("SupplyChain");
	const contract = await ContractFactory.deploy();

	await contract.deployed();

	console.log(
		`Counter contract deployed to https://explorer.public.zkevm-test.net/address/${contract.address}`
	);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
