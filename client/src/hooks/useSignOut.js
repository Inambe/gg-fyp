import { useSetRecoilState } from "recoil";
import authState from "../atoms/auth";

const useSignOut = () => {
	localStorage.removeItem("authToken");
	const setAuthState = useSetRecoilState(authState);
	setAuthState(null);
};
export default useSignOut;
