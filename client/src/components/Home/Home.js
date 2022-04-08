import React, { useState, useEffect } from 'react';
import { Header, Feed, Footer } from '../../components';
import { fetchData } from '../../api';
import { updateDocTitle, updatePath } from '../../helpers/string';
import { LIMIT, DEFAULT_PAGE } from '../../constants/constants';
import PropTypes from 'prop-types';
import styles from './Home.module.css';
import {useLocation, useNavigate} from "react-router-dom";
const title = document.title;

const Home = (props) => {

	const history = useNavigate()
	const { pathname } = useLocation()
	console.log(pathname)

	const [isLoading, setLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [url, setUrl] = useState(pathname);
	const [news, setNews] = useState({ data: [] });
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		// setUrl(updatePath(pathname, history));
		setHasMore(true);
		setNews([]);
		// fetchDataByCategory();
		setHasError(false);
		document.title = updateDocTitle(title, pathname);

		// eslint-disable-next-line
	}, [pathname]);

	useEffect(() => {
		console.log("Seconf use")
		// setUrl(updatePath(pathname, history));
		fetchDataByCategory();
	}, [])

	const fetchDataByCategory = async () => {
		setLoading(true);

		try {
			console.log(pathname);
			const data = await fetchData(pathname, DEFAULT_PAGE, LIMIT);
			const { page, pages } = data;

			if (page >= pages) {
				setHasMore(false);
			}

			if (data.message) return; // request has been cancelled
			if (data.docs.length < 1) throw new Error('Data fetch failed.');

			setNews({
				data: data.docs,
				nextPage: page < pages ? page + 1 : page,
			});
		} catch (err) {
			setHasMore(false);
			setHasError(true);
		} finally {
			setLoading(false);
		}
	};

	const fetchMore = async () => {
		if (isLoading) return;

		try {
			const data = await fetchData(url, news.nextPage, LIMIT);
			const { page, pages } = data;

			if (page >= pages) {
				setHasMore(false);
			}

			setNews({
				data: [...news.data, ...data.docs],
				nextPage: page < pages ? page + 1 : page,
			});
		} catch (err) {
			setHasMore(false);
			setHasError(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.root}>
			{/* <Header {...props} /> */}
			<Feed
				data={news.data}
				isLoading={isLoading}
				fetchMore={fetchMore}
				hasMore={hasMore}
				hasError={hasError}
				{...props}
			/>
			<Footer />
		</div>
	);
};

Home.propTypes = {
	pathname: PropTypes.string,
	history: PropTypes.object,
};

export default Home;
