import React, { useEffect, useState } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import { Typography, Button, Card, Fade } from '@material-ui/core';
import { hasStorage } from '../../helpers/hasStorage';
import styles from './CookieBanner.module.css';

const CookieBanner = ({ isDark }) => {
	const [consent, setConsent] = useState(false);

	useEffect(() => {
		if (hasStorage) {
			const hasConsented = localStorage.getItem('cookie-consent');
			if (hasConsented) setConsent(true);
		}
	}, []);

	const handleClick = () => {
		setConsent(true);

		if (hasStorage) {
			localStorage.setItem('cookie-consent', 'true');
		}
	};

	return (
		<Fade in={!consent}>
			<Card
				elevation={8}
				className={styles.root}
				style={{ background: isDark ? '#383B3E' : '#161C1E' }}>
				<InfoIcon color='primary' className={styles.icon} />
				<Typography
					className={styles.typography}
					variant='subtitle2'
					color='textPrimary'
					component='p'>
					{'Tämä sivusto käyttää evästeitä liikenteen analysointiin.'}
				</Typography>
				<Button onClick={handleClick} variant='outlined' color='primary'>
					OK
				</Button>
			</Card>
		</Fade>
	);
};

export default CookieBanner;
