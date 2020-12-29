import { atom, selector } from "recoil";
import jwt_decode from "jwt-decode";

const authState = atom({
	key: "authState",
	default: localStorage.getItem("authToken"),
});

export const isNurseryAuthenticated = selector({
	key: "isNurseryAuthenticated",
	get: ({ get }) => {
		const token = get(authState);
		if (!token) return false;

		let payload;
		try {
			payload = jwt_decode(token);
			return payload.userType === "nursery";
		} catch {
			return false;
		}
	},
});

export default authState;
