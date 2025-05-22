/**
 * @file AxiosAPI.ts
 * @description
 * @author rainbowx
 * @date 2025/5/19
 */

import axios, {AxiosResponse} from "axios";

interface APIResponse<T = any> {
	status: string;
	data: T;
}

function handleResponse<T>(response: AxiosResponse<APIResponse<T>>): T {
	if (response.data.status !== "ok") {
		throw new Error(`API Error: ${response.data.status}`);
	}
	return response.data.data;
}

export const AxiosAPI = axios.create({
	baseURL: 'https://127.0.0.1:8080/api',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const API = {
	async get<T = any>(url: string, params?: any): Promise<T> {
		const response = await AxiosAPI.get<APIResponse<T>>(url, { params });
		return handleResponse(response);
	},

	async post<T = any>(url: string, body?: any): Promise<T> {
		const response = await AxiosAPI.post<APIResponse<T>>(url, body);
		return handleResponse(response);
	},

	async put<T = any>(url: string, body?: any): Promise<T> {
		const response = await AxiosAPI.put<APIResponse<T>>(url, body);
		return handleResponse(response);
	},

	async delete<T = any>(url: string, params?: any): Promise<T> {
		const response = await AxiosAPI.delete<APIResponse<T>>(url, { params });
		return handleResponse(response);
	},
};
