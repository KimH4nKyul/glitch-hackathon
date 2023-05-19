import { useEffect } from "react";

const useOnMount = (effect) => useEffect(effect, []);

export default useOnMount;
