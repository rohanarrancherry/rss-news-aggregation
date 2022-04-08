import React from 'react';
import { Typography, Link } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './Logo.module.css';
import logo from '../../assets/app-logo.svg';

const Logo = ({ width, variant, mr }) => {
	return (
		<div className={styles.branding}>
			<Link
				href='/'
				underline='none'
				style={{
					display: 'flex',
					height: '100%',
					alignItems: 'center'
				}}>
				<img width={width} src={logo} alt='logo' style={{ marginRight: `${mr}` }}></img>
				<Typography variant={variant} color='primary' className={styles.appTitle}>
					Uutis<span className={styles.thin}>ankka</span>
				</Typography>
			</Link>
		</div>
	);
};

Logo.propTypes = {
	width: PropTypes.number,
	varinat: PropTypes.string,
	mr: PropTypes.string
};

export default Logo;
