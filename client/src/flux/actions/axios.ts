import axios, { AxiosRequestConfig } from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:4000";
axios.defaults.baseURL = `${baseUrl}/api`;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;






const httpRequest = <T>(req: AxiosRequestConfig): Promise<T> => {
	return new Promise(async (resolve, reject) => {
		try {
			const request = await axios(req);

			resolve(request.data.data);
		} catch (e) {
			reject(e?.response || e?.request ||{});
		}
	});
};

export default httpRequest;
