const probe = require('probe-image-size');
// const feedSources = require('../sources/feedSources');
const TIME_TO_LIVE = 60 * 60 * 24 * 2 * 1000;

const parseFeed = async (feed, src) => {
    const url = parseImageUrl(feed);
    const details = await getImageDetails(url);

    if (!url) {
        return {
            ...feed,
            image: { url },
            categories: parseCategories(feed, src)
        };
    }

    const { width, height, wUnits } = details;

    return {
        ...feed,
        image: { url, width, height, unit: wUnits },
        categories: parseCategories(feed, src)
    };
};

const getImageDetails = async url => {
    if (!url) return;
    return await probe(url);
};

const filterOutNonUnique = arr => {
    const unique = [
        ...new Set(arr.map(item => JSON.stringify({ home: item.home, source: item.source })))
    ];
    return unique.map(item => JSON.parse(item));
};

const parseImageUrl = feed => {
    if (feed.image) {
        if (typeof feed.image === 'string') return feed.image;
        return feed.image['$'].url;
    }

    // mostly for YLE's stamp sized images which are resizable by altering the url
    if (feed.enclosure) {
        return (
            feed.enclosure.url
                // width and the height are selected so that the aspect ratio remains correct
                .replace('w_205', 'w_600')
                .replace('h_115', 'h_337')
                .replace('http:', 'https:')
        );
    }

    // extract image url from content
    if (feed.content) {
        const matches = feed.content
            .replace('http:', 'https:')
            .match(/\b(https?:\/\/\S+(?:png|jpe?g|gif)\s*)\b/i);

        return matches ? matches[0] : null;
    }

    return null;
};

const parseCategories = (feed, src) => {
    if (!feed.categories) {
        return [src.category.toLowerCase()];
    }

    const newCategories = feed.categories
        .map(item => {
            if (item.hasOwnProperty('_')) {
                return item['_'];
            }
            return item;
        })
        .map(item => item.toLowerCase());

    // append category from source if exists
    if (src.category) {
        if (!newCategories.includes(src.category.toLowerCase())) {
            newCategories.push(src.category);
        }
    }

    return newCategories;
};

const getHostname = url => {
    if (typeof url !== 'string') return;

    const newUrl = new URL(url).hostname.split('.');

    if (newUrl.length > 2) {
        return newUrl[1];
    } else {
        return newUrl[0];
    }
};

const daysAgo = date => {
    const daysAgo = Date.now() - TIME_TO_LIVE;
    return date >= daysAgo;
};

module.exports = {
    parseFeed,
    getImageDetails,
    daysAgo,
    filterOutNonUnique,
    parseImageUrl,
    parseCategories,
    getHostname
};
