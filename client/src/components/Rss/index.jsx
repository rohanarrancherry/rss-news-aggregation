import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// Route, Switch, Redirect

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from "react-router-dom";

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Home } from '../../components';
import { lightTheme, darkTheme } from '../../styles';
import { hasStorage } from '../../helpers/hasStorage';
import ReactGA from 'react-ga';

import styles from './Rss.module.css';

const Rss = () => {
	const [options, setOptions] = useState({ isDark: false, layout: 'grid' });

	useEffect(() => {
		if (hasStorage()) {
			const darkTheme = localStorage.getItem('isDark') === 'true' ? true : false;
			const layout =
				localStorage.getItem('layout') == null ? 'grid' : localStorage.getItem('layout');

			setOptions({ isDark: darkTheme, layout });
		}

		ReactGA.initialize({ trackingId: process.env.REACT_APP_GA_ID });
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);

	const handleThemeChange = () => {
		setOptions({ ...options, isDark: !options.isDark });

		if (hasStorage()) {
			localStorage.setItem('isDark', !options.isDark);
		}
	};

	const handleLayoutChange = () => {
		window.scrollTo(0, 0);
		setOptions({ ...options, layout: options.layout === 'grid' ? 'list' : 'grid' });

		if (hasStorage()) {
			localStorage.setItem('layout', options.layout === 'grid' ? 'list' : 'grid');
		}
	};

	return (
		<MuiThemeProvider theme={options.isDark ? darkTheme : lightTheme}>
			<CssBaseline />
			<Router>
				<div className={styles.Rss}>
					<Routes>
						<Navigate exact from='/feed' to='/feed/latest' />
						<Route
							exact
							path='/:page?'
							render={(props) => (
								<Home
									options={options}
									handleThemeChange={handleThemeChange}
									handleLayoutChange={handleLayoutChange}
									{...props}
								/>
							)}
						/>
						<Route render={() => <Navigate to={{ pathname: '/' }} />} />
					</Routes>
				</div>
			</Router>
		</MuiThemeProvider>
	);
};

export default Rss;
