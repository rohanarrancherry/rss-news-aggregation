import React, { useState, useRef, useEffect } from 'react';
import ReactTimeAgo from 'react-time-ago';
import JavascriptTimeAgo from 'javascript-time-ago';
import fi from 'javascript-time-ago/locale/fi';
import ImageIcon from '@material-ui/icons/Image';
import PropTypes from 'prop-types';
import {
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	Avatar,
	Fade,
} from '@material-ui/core';
import styles from './FeedItem.module.css';

JavascriptTimeAgo.addLocale(fi);

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
		<Card elevation={1} onClick={() => window.open(link, '_blank', 'noopener noreferrer')}>
			<CardActionArea className={options.layout === 'list' ? styles.list : null} disableRipple>
				{image.url && image.width >= MIN_IMAGE_WIDTH && (
					<div className={styles.container} style={{ height: `${maxHeight}px` }}>
						<Fade timeout={500} in={hasLoaded}>
							<CardMedia
								component='img'
								className={styles.media}
								image={image.url}
								title={source}
								alt='Uutiskuva'
								onLoad={handleImageLoad}
							/>
						</Fade>
						<div className={styles.placeholder}>
							<ImageIcon color='primary' />
						</div>
					</div>
				)}
				<CardContent className={styles.content} ref={contentEl}>
					<Typography
						gutterBottom
						variant='subtitle2'
						color='textPrimary'
						component='h6'
						className={styles.title}>
						{title}
					</Typography>
					<div className={styles.wrapper}>
						<div className={styles.source}>
							<Avatar variant='rounded' alt='Lähteen logo' src={favicon} className={styles.avatar}>
								{firstLetter(source) || '?'}
							</Avatar>
							<Typography variant='subtitle2' color='textSecondary' className={styles.details}>
								{source}
							</Typography>
						</div>
						<div className={styles.date}>
							<Typography variant='subtitle2' color='textSecondary' className={styles.details}>
								<span style={{ margin: '5px' }}>-</span>
								<ReactTimeAgo date={new Date(isoDate)} locale='fi' timeStyle='twitter' />
							</Typography>
						</div>
					</div>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

FeedItem.propTypes = {
	data: PropTypes.object,
	options: PropTypes.object,
};

export default FeedItem;
