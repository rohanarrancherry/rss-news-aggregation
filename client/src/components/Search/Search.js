import React, { useState, useRef } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Backdrop, TextField } from '@material-ui/core';
import style from './Search.module.css';

const Search = () => {
	const [open, setOpen] = useState(false);
	const textInput = useRef(null);

	const handleClick = () => {
		setOpen(!open);

		setTimeout(() => {
			textInput.current.focus();
		}, 100);
	};

	return (
		<div className={style.root}>
			<IconButton aria-label='Haku' onClick={handleClick}>
				<SearchIcon color='secondary' />
			</IconButton>
			<Backdrop className={style.backdrop} open={open}>
				<div className={style.container}>
					<TextField
						fullWidth
						label='Hae Uutisia'
						helperText='Voit hakea uutisia hakusanoilla kuten "autot"'
						variant='outlined'
						color='primary'
						inputRef={textInput}
					/>
				</div>
				<div className={style.closeButton}>
					<IconButton aria-label='Sulje' onClick={handleClick}>
						<CloseIcon color='primary' fontSize='large' />
					</IconButton>
				</div>
			</Backdrop>
		</div>
	);
};

export default Search;
