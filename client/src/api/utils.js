import { GGAPI } from "../constants";

export const uploadsUrl = (name) => {
	return `${GGAPI.BASE_URL}uploads/${name}`;
};
