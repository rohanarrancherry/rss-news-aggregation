import React, { useState, useRef, useEffect } from 'react';
import ReactTimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import styles from './FeedItem.module.css';
import axios from "axios";

JavascriptTimeAgo.addLocale(en);

const FeedItem = ({ data, options }) => {
	const MIN_IMAGE_WIDTH = 250
	const firstLetter = (s) => {
		if (typeof s !== 'string') return '';
		return s.charAt(0).toUpperCase();
	};

	const { image, source, title, isoDate, favicon, link } = data;
	const [maxHeight, setMaxHeight] = useState(null);
	const [hasLoaded, setHasLoaded] = useState(false);
	const contentEl = useRef(null);

	const handleImageLoad = () => {
		setHasLoaded(true);
	};

	const shouldLimitHeight = () => {
		if (options.layout === 'list') {
			setMaxHeight(contentEl.current?.offsetHeight);
		} else {
			setMaxHeight(null);
		}
	};

	useEffect(() => {
		shouldLimitHeight();
	}, [options]);

	return (
		<Card className={styles.zoom}   elevation={1} onClick={
			async () => {
				window.open(link, '_blank', 'noopener noreferrer')
				const url = "/api/feeds/log";
				let data = {
					"token": localStorage.getItem("token"),
					"timestamp": new Date().toLocaleString(),
					"newsLink": link,
					"source": source
				}
				const {data: res} = await axios.post(url, data);
			}
		}>
				{image.url && image.width >= MIN_IMAGE_WIDTH && (
					<div className={styles.container} style={{ height: `${maxHeight}px` }}>
							<Card.Img
								component='img'
								className={styles.media}
								src={image.url}
								title={source}
								alt='News Image'
								onLoad={handleImageLoad}
							/>
						<div className={styles.placeholder}>
						</div>
					</div>
				)}
				<Card.Body className={styles.content} ref={contentEl}>
						{title}
					<div className={styles.wrapper}>
						<div className={styles.source}>
								{source}
						</div>
						<div className={styles.date}>
								<span style={{ margin: '5px' }}>-</span>
								<ReactTimeAgo date={new Date(isoDate)} locale='en' timeStyle='twitter' />
						</div>
					</div>
				</Card.Body>
		</Card>
	);
};

FeedItem.propTypes = {
	data: PropTypes.object,
	options: PropTypes.object,
};

export default FeedItem;
