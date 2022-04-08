import styles from "./styles.module.css";
import axios from "axios";
import {useEffect, useState} from "react";
import Feed from "../Feed/Feed";
import {fetchData} from "../api/api";

const Main = () => {

	const DEFAULT_PAGE = 1;
	const LIMIT = 30;

	const [error, setError] = useState("")
	const [categories, setCategories] = useState(null)
	const [feeds, setFeeds] = useState(null)

	const [isLoading, setLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	// const [url, setUrl] = useState(pathname);
	const [news, setNews] = useState({ data: [] });
	const [hasMore, setHasMore] = useState(true);


	let test_data = null

	useEffect(() => {
		getCategory()
		// getFeeds()
	}, [])


	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const getFeeds = () => {
		const { page, pages } = feeds;

		if (page >= pages) {
			setHasMore(false);
		}

		if (feeds.docs.length < 1) throw new Error('Data fetch failed.');

		setNews({
			data: feeds.docs,
			nextPage: page < pages ? page + 1 : page
		})
	}


	const getCategory = async (e) => {
		// e.preventDefault();
		try {
			setLoading(true);
			const url = "/api/user/categories";
			console.log(url)
			let token = localStorage.getItem("token")
			console.log(token);
			const data = await axios.get(url, {
				headers: {Authorization: 'Bearer: ' + token}
			});
			setCategories(data.data)
			console.log("Beforee equest ")
			const feedData = await fetchData('/' + data.data[0], DEFAULT_PAGE, LIMIT)
			const { page, pages } = feedData;
			console.log(page, pages)
			if (page >= pages) {
				setHasMore(false);
			}

			if (feedData.message) return; // request has been cancelled
			if (feedData.docs.length < 1) throw new Error('Data fetch failed.');

			setNews({
				data: feedData.docs,
				nextPage: page < pages ? page + 1 : page,
			});

		} catch (error) {
			setHasMore(false);
			setHasError(true);
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		} finally {
			setLoading(false);
		}
	};

	const fetchMore = async () => {
		if (isLoading) return;

		try {
			const data = await fetchData(categories[0], news.nextPage, LIMIT);
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
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>News Book</h1>

				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>

			<Feed
				data={news.data}
				isLoading={isLoading}
				fetchMore={fetchMore}
				hasMore={hasMore}
				hasError={hasError}
			/>
		</div>
	);
};

export default Main;
