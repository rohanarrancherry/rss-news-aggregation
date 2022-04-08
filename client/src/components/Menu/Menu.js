import React, { useState } from 'react';
import {
	IconButton,
	Menu,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Switch,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import PropTypes from 'prop-types';
import style from './Menu.module.css';

const SimpleMenu = ({ options, handleThemeChange, handleLayoutChange }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = (e, newVal) => {
		if (e.target.id === 'theme-switcher') {
			handleThemeChange();
		} else if (newVal != null) {
			handleLayoutChange();
		}
	};

	return (
		<div className={style.root}>
			<IconButton aria-label='Asetukset' onClick={handleClick}>
				<MoreVertIcon color='secondary' />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				getContentAnchorEl={null}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				transformOrigin={{ vertical: 'top', horizontal: 'center' }}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<FormControl component='fieldset'>
					<FormLabel color='primary' focused={true} component='label'>
						Ulkoasu
					</FormLabel>
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									color='secondary'
									id='theme-switcher'
									checked={options.isDark}
									onChange={handleChange}
									name='theme-switch'
								/>
							}
							label='Tumma'
						/>
					</FormGroup>
				</FormControl>
				<FormLabel
					style={{ margin: '1rem 0 0.8rem 0' }}
					color='primary'
					focused={true}
					component='label'>
					Asettelu
				</FormLabel>
				<ToggleButtonGroup
					size={'small'}
					value={options.layout}
					exclusive
					onChange={handleChange}
					aria-label='layout'>
					<ToggleButton value='grid' aria-label='grid layout'>
						<ViewQuiltIcon />
					</ToggleButton>
					<ToggleButton value='list' aria-label='list layout'>
						<CalendarViewDayIcon />
					</ToggleButton>
				</ToggleButtonGroup>
			</Menu>
		</div>
	);
};

Menu.propTypes = {
	options: PropTypes.object,
	handleThemeChange: PropTypes.func,
	setIsOpen: PropTypes.func,
};

export default SimpleMenu;
