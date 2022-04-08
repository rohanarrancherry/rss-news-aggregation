export const overrides = {
	MuiTypography: {
		h6: {
			display: 'flex',
			alignItems: 'center',
			height: '100%',
		},
		h4: {
			fontSize: '28px',
		},
	},
	MuiBackdrop: {
		root: {
			backgroundColor: 'rgba(0, 0, 0, 0)',
		},
	},
	MuiList: {
		root: {
			display: 'flex',
			flexDirection: 'column',
		},
		padding: {
			paddingTop: 15,
			paddingRight: 20,
			paddingBottom: 15,
			paddingLeft: 20,
		},
	},
	MuiFormLabel: {
		root: {
			marginBottom: 5,
			marginTop: 5,
		},
	},
	MuiFormControlLabel: {
		label: {
			opacity: 0.8,
			fontSize: '0.875rem',
		},
	},
	MuiDialogContent: {
		root: {
			height: '42vh',
			maxHeight: '42vh',
			width: '400px',
			maxWidth: '75vw',
			overflow: 'hidden',
		},
	},
	MuiDialog: {
		container: {
			background: 'rgba(0, 0, 0, 0.8)',
		},
		paperScrollPaper: {
			maxHeight: '600px',
		},
	},
	MuiAvatar: {
		rounded: {
			borderRadius: '2px',
		},
	},
	MuiTabs: {
		root: {
			marginBottom: 3,
		},
	},
	MuiOutlinedInput: {
		notchedOutline: {
			borderColor: 'rgba(255, 255, 255, 0.7)',
		},
	},
	PrivateTabIndicator: {
		root: {
			transition: 'none',
		},
	},
};
