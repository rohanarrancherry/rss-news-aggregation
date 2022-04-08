import { minutesAgo } from './time';

const TTL = 1000 * 60 * 15

export const shouldUseCache = (cachedData, page, key) => {
    const parsed = JSON.parse(cachedData);
    const shouldClearCache = minutesAgo(parsed.cached_at, TTL);

    if (shouldClearCache) {
        sessionStorage.removeItem(key);
        return false;
    }
    return page <= parsed.page;
};

export const storeInCache = (key, data) => {
    const now = new Date().getTime();
    const oldData = JSON.parse(sessionStorage.getItem(key));

    if (oldData) {
        const { docs } = data;
        const newDocs = [...oldData.docs, ...docs];

        return sessionStorage.setItem(key, JSON.stringify({ ...data, ...oldData, docs: newDocs }));
    }

    sessionStorage.setItem(key, JSON.stringify({ ...data, cached_at: now }));
}