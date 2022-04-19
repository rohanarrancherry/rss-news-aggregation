import axios from 'axios';
import { shouldUseCache, storeInCache } from './cache';
import { checkStorage } from './checkStorage';

let cancelToken;
const DEFAULT_ENDPOINT = '/api/feeds'

export const fetchData = async (url, page, limit) => {
    url = url.replace('(', '').replace(')', '');
    console.log(url);
    const cachedData = checkStorage() && sessionStorage.getItem(url);

    /*
     * Cancel token is used to cancel ongoing fetch request,
     * this is useful when category is changed before data has finished fetching
     */
    if (cancelToken) {
        cancelToken.cancel('Operation canceled due to new request.');
    }

    cancelToken = axios.CancelToken.source();

    try {
        if (checkStorage() && cachedData && shouldUseCache(cachedData, page, url)) {
            return JSON.parse(cachedData);
        }

        const token = localStorage.getItem("token")

        const { data } = await axios.get(`${DEFAULT_ENDPOINT}/${url}?page=${page}&limit=${limit}`, {
            cancelToken: cancelToken.token,
            headers:{Authorization: 'Bearer: ' + token}
        });

        if (checkStorage() && data.docs.length > 0) {
            storeInCache(url, data);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const fetchSources = async () => {
    try {
        const { data } = await axios.get(`${DEFAULT_ENDPOINT}/latest`);
        return data;
    } catch (error) {
        return error;
    }
};
