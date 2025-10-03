import axios from "axios";

export const api = axios.create({
	baseURL: process.env.PORT || "http://localhost:3001",
});
