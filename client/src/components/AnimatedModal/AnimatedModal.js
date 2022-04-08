import React, { useState, useEffect } from 'react';
import { fetchSources } from '../../api/index';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Link
} from '@material-ui/core';
import styles from './AnimatedModal.module.css';

const AnimatedModal = () => {
	const [open, setOpen] = useState(false);
	const [sources, setSources] = useState([]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		async function getSources() {
			const data = await fetchSources();
			setSources(data?.sources);
		}
		getSources();
	}, []);

	return (
		<>
			<Button
				onClick={handleOpen}
				className={styles.sourcesBtn}
				style={{ display: sources ? 'inline' : 'none' }}>
				Lähteet
			</Button>
			<Dialog maxWidth='md' open={open} onClose={handleClose}>
				<DialogTitle
					className={styles.dialogTitle}>{`Lähteet (${sources?.length} kpl)`}</DialogTitle>
				<DialogContent>
					<DialogContentText className={styles.dialogContentText}>
						{sources &&
							sources.map((item, i) => (
								<li key={i} className={styles.listItem}>
									<Link
										underline='hover'
										target='_blank'
										rel='noopener noreferrer'
										color='secondary'
										href={item.home}>
										{item.source}
									</Link>
								</li>
							))}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary' autoFocus>
						Sulje
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AnimatedModal;
