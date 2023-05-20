import { useState } from "react";

const useSupplier = () => {
	const [supplier, setSuppliers] = useState(
		"Damir's items"
	);
	return { supplier };
};

export default useSupplier;
