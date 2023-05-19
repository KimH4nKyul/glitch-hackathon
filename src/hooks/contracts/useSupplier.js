import { useState } from "react";

const useSupplier = () => {
	const [supplier, setSuppliers] = useState(
		"Paris Baguette: Potato Bread Supply chain"
	);
	return { supplier };
};

export default useSupplier;
