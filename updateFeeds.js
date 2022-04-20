// const feedSources = require('./sources/feedSources');
const Feed = require('./Models/Feed.model');
const RSSparser = require('rss-parser');
const mongoose = require('mongoose');
const feedParser = require('./helpers/feedParser');
const time = require('./helpers/feedParser');
require('dotenv').config();

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        dbName: process.env.DB_NAME,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

const parser = new RSSparser({
    customFields: {
        item: [
            ['image', 'image'],
            ['guid', 'guid'],
            ['enclosures', 'image'],
            ['rss:image', 'image'],
            ['media:content', 'image'],
            ['media:thumbnail', 'image'],
            ['content:encoded', 'encodedContent']
        ]
    }
});

exports.job = async (feedSources) => {
    console.log('Running on schedule..');
    console.log(feedSources.length)
    try{
        await Feed.deleteMany({}).then(
            async () => {
                console.log("deleted")
                for (const source of feedSources) {
                    try {
                        const feed = await parser.parseURL(source.url);
                        const parsedFeed = await Promise.all(
                            feed.items.map(async item => await feedParser.parseFeed(item, source))
                        );
                        for (const feed1 of parsedFeed
                            .filter(item => time.daysAgo(new Date(item.isoDate)))) {
                            const newFeed = new Feed({
                                ...feed1,
                                source: source.source,
                                favicon: source.favicon
                            });
                            Feed.findOne({guid: newFeed.guid}, async (err, feed) => {
                                if (err) {
                                    console.log(err.ValidatorError || err.MongoError);
                                }
                                if (!feed) {
                                    await newFeed.save((err, data) => {
                                        // if (err) console.log(err._message || err.MongoError || err);
                                        if (data) console.log(data._id, 'saved to database.');
                                    });
                                }
                            });
                        }
                    } catch (err) {
                        if (err === 'Status code 404')
                            continue;
                        // console.log(err);
                    }
                }
            })
    return "success"
    }
    catch (err) {
        // console.log(err);
        return err
    }
};