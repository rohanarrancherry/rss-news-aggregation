const feedSources = require('./feedSources');
const Feed = require('./Models/Feed.model');
const RSSparser = require('rss-parser');
const mongoose = require('mongoose');
const feedParser = require('./Models/feedParsing');
const time = require('./Models/feedParsing');
require('dotenv').config();

mongoose
	.connect('mongodb://localhost:27017', {
		useNewUrlParser: true,
		dbName:"test1",
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => job())
	.catch(err => {
		console.log(err);
	}, 240000);

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

const job = async () => {
	console.log('Running on schedule..');

	feedSources.forEach(async source => {
		try {
			const feed = await parser.parseURL(source.url);
			// const parsedFeed = feed.items.map(item => feedParser.parseFeed(item, source));
			const parsedFeed = await Promise.all(
				feed.items.map(async item => await feedParser.parseFeed(item, source))
			);

			console.log('parsing feeds..');

			parsedFeed
				.filter(item => time.daysAgo(new Date(item.isoDate)))
				.forEach(feed => {
					const newFeed = new Feed({
						...feed,
						source: source.source,
						favicon: source.favicon
					});

					Feed.findOne({ guid: newFeed.guid }, (err, feed) => {
						if (err) {
							console.log(err.ValidatorError || err.MongoError);
						}
						if (!feed) {
							newFeed.save((err, data) => {
								if (err) console.log(err._message || err.MongoError || err);
								if (data) console.log(data._id, 'saved to database.');
							});
						}
					});
				});
		} catch (err) {
			if (err === 'Status code 404') return;
			console.log(err);
		}
	});
};
