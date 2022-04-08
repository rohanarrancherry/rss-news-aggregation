import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, useMediaQuery } from '@material-ui/core';
import { CATEGORIES } from '../../constants/constants';
import { useParams } from 'react-router-dom';

const CategoryTabs = (props) => {
	const notHoverable = useMediaQuery('(hover: none)');
	const matches = useMediaQuery('(min-width: 975px)');
	const { history, match } = props;
	const { params } = useParams;
	console.log(params)
	const { page } = params;

	useEffect(() => {
		setSelectedTab(findIndexOf(page));
	}, [page]);

	const findIndexOf = (page) => {
		const index = CATEGORIES.indexOf(page);
		return index < 0 ? 0 : index;
	};

	const [selectedTab, setSelectedTab] = useState(findIndexOf(page));

	const handleChange = (event, newValue) => {
		history.push(`${CATEGORIES[newValue]}`);
		window.scrollTo(0, 0);
	};

	return (
		<AppBar position='static' elevation={0} color='default'>
			<Tabs
				centered={matches}
				value={selectedTab}
				onChange={handleChange}
				indicatorColor='primary'
				textColor='primary'
				variant={matches ? 'standard' : 'scrollable'}
				scrollButtons={!matches && notHoverable ? 'off' : 'on'}
				aria-label='uutiskategoriat'>
				{CATEGORIES.map((label, i) => (
					<Tab disableFocusRipple key={i} label={label} style={{ minWidth: 100 }} />
				))}
			</Tabs>
		</AppBar>
	);
};

CategoryTabs.propTypes = {
	history: PropTypes.object,
	params: PropTypes.object,
	page: PropTypes.string,
};

export default CategoryTabs;
