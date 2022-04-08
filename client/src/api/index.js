import axios from 'axios';
import { shouldUseCache, storeInCache } from '../helpers/cache';
import { hasStorage } from '../helpers/hasStorage';
import { DEFAULT_ENDPOINT } from '../constants/constants';
let cancelToken;

export const fetchData = async (url, page, limit) => {
	url = url.replace('(', '').replace(')', '');
	console.log(url);
	const cachedData = hasStorage() && sessionStorage.getItem(url);

	/*
	 * Cancel token is used to cancel ongoing fetch request,
	 * this is useful when category is changed before data has finished fetching
	 */
	if (cancelToken) {
		cancelToken.cancel('Operation canceled due to new request.');
	}

	cancelToken = axios.CancelToken.source();

	try {
		if (hasStorage() && cachedData && shouldUseCache(cachedData, page, url)) {
			return JSON.parse(cachedData);
		}
		let token = localStorage.getItem('token')
		console.log("RRRRRRRR")
		console.log("Toooken", token)
		const { data } = await axios.get(`${DEFAULT_ENDPOINT}${url}?page=${page}&limit=${limit}`, {
			cancelToken: cancelToken.token,
			headers: {Authorization: token}
		});

		if (hasStorage() && data.docs.length > 0) {
			storeInCache(url, data);
		}

		return data;
	} catch (error) {
		return error;
	}
};

export const fetchSources = async () => {
	try {
		let token = localStorage.getItem("token")
		console.log("Reached lahteet")
		const { data } = await axios.get(`${DEFAULT_ENDPOINT}/Sports`,{
			headers: {Authorization: token}});
		return data;
	} catch (error) {
		return error;
	}
};
