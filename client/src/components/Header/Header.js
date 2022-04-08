import React, { useState } from 'react';
import { CategoryTabs, Logo, Menu } from '../../components';
import { AppBar, Toolbar, useScrollTrigger, Slide } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

const HideOnScroll = (props) => {
	const { children, menuIsOpen } = props;
	const trigger = useScrollTrigger();

	/*
	 * Check whether the menu is open or not.
	 * This prevents hiding the header while menu is still open in some scenarios
	 */
	const newTrigger = menuIsOpen ? false : trigger;

	return (
		<Slide appear={false} direction='down' in={!newTrigger}>
			{children}
		</Slide>
	);
};

const Header = (props) => {
	const [menuIsOpen] = useState(false);

	return (
		<HideOnScroll menuIsOpen={menuIsOpen} {...props}>
			<AppBar position='sticky' elevation={0} color='default' className={styles.appbar}>
				<Toolbar className={styles.toolbar}>
					<div className={styles.wrapper}>
						<Logo width={21} variant={'h5'} mr={'12px'} />
						<Menu {...props} />
					</div>
				</Toolbar>
				<CategoryTabs {...props} />
			</AppBar>
		</HideOnScroll>
	);
};

HideOnScroll.propTypes = {
	children: PropTypes.object,
	menuIsOpen: PropTypes.bool,
};

export default Header;
