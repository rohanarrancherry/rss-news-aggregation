import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './Error.module.css';

const Error = () => {
	const handlePageRefresh = () => {
		window.location.reload();
	};

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
					Something went wrong!
					This is a temporary error, please try again soon.
				<Button
					onClick={handlePageRefresh}
					variant='outlined'
					color='secondary'
					className={styles.button}>
					Refresh the Page
				</Button>
			</div>
		</div>
	);
};

export default Error;
