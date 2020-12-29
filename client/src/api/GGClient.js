import axios from "axios";
import { GGAPI } from "../constants";

const GGClient = axios.create({
	baseURL: GGAPI.BASE_URL,
});

export default GGClient;
