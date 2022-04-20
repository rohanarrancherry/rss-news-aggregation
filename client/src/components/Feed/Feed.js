import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Masonry as Masonic } from 'masonic';
import FeedItem from '../FeedItem/FeedItem';
import Error from "../Error/Error";
import PropTypes from 'prop-types';
import styles from './Feeds.module.css';
import {Spinner} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const Feed = ({ data = [], fetchMore, hasMore, hasError, isLoading }) => {
	let key = uuidv4()

	useEffect(()=>{
		key = uuidv4()
	}, [data])
	const options = {
		isDark: true,
		layout: "grid"
	}
	const columnGutter = options.layout === 'list' ? 10 : 15;
	const columnWidth = options.layout === 'list' ? 500 : 240;
	const FeedItemWithProps = useCallback(
		(props) => <FeedItem {...props} options={options} />,
		[options]
	);
	
	return (
		<InfiniteScroll
			dataLength={data.length}
			scrollThreshold={0.5}
			next={fetchMore}
			hasMore={hasMore}
			style={{ padding: '10px 10px 150px 10px' }}
			loader={
				<div className={styles.loader}>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			}>
			{hasError && <Error />}
			{data?.length > 1 && (
				<Masonic
				key= {key}
					role='list'
					className={styles.masonry}
					items={data}
					columnGutter={columnGutter}
					columnWidth={columnWidth}
					overscanBy={2}
					render={FeedItemWithProps}
				/>
			)}
		</InfiniteScroll>
	);
};

Feed.propTypes = {
	data: PropTypes.array,
	fetchMore: PropTypes.func,
	hasMore: PropTypes.bool,
	hasError: PropTypes.bool,
	isLoading: PropTypes.bool,
	options: PropTypes.object,
};

export default Feed;
