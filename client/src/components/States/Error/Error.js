import React from 'react';
import { Typography, Button } from '@material-ui/core';
import styles from './Error.module.css';

const Error = () => {
	const handlePageRefresh = () => {
		window.location.reload();
	};

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<Typography variant='h4' className={styles.title}>
					Something went wrong!
				</Typography>
				<Typography variant='subtitle2' color='secondary'>
					This is a temporary error, please try again soon.
				</Typography>
				<Button
					onClick={handlePageRefresh}
					variant='outlined'
					color='secondary'
					className={styles.button}>
					Refresh
				</Button>
			</div>
		</div>
	);
};

export default Error;
