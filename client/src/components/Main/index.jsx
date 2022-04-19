import styles from "./styles.module.css";
import axios from "axios";
import {useEffect, useState} from "react";
import Feed from "../Feed/Feed";
import {fetchData} from "../api/api";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import {useParams} from "react-router-dom";

const Main = () => {
    const [category, setCategory] = useState("latest")
    const { categoryParam } = useParams();
    const DEFAULT_PAGE = 1;
    const LIMIT = 30;

    const [error, setError] = useState("")
    const [feeds, setFeeds] = useState(null)

    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    // const [url, setUrl] = useState(pathname);
    const [news, setNews] = useState({data: []});
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        getCategory()
    }, [categoryParam])

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const getFeeds = () => {
        const {page, pages} = feeds;

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
            const feedData = await fetchData('/' + categoryParam, DEFAULT_PAGE, LIMIT)
            const {page, pages} = feedData;
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
            const data = await fetchData(categoryParam, news.nextPage, LIMIT);
            const {page, pages} = data;

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
            <CategoryMenu/>
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
