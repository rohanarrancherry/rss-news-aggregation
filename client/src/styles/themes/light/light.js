import { createTheme } from '@material-ui/core/styles';
import { blueGrey, grey } from '@material-ui/core/colors';
import { overrides } from '../../overrides';

const lightTheme = createTheme({
	palette: {
		primary: {
			main: blueGrey[800],
		},
		secondary: {
			main: '#5A6064', //menu icon
		},
		background: {
			default: '#fff',
			paper: '#fff', // menu bg
		},
		text: {
			primary: blueGrey[900],
			secondary: 'rgba(55, 71, 79, 0.75)', // details, tabs
		},
		divider: '#e0e0e0',
	},
	overrides: {
		...overrides,
		MuiCardContent: {
			root: {
				background: '#fff',
			},
		},
		MuiButtonBase: {
			root: {
				color: grey[900], //card hover
			},
		},
		MuiToggleButton: {
			root: {
				color: '#9AA0A1',
				borderColor: '#D6DBDF',
				'&.Mui-selected': {
					color: '#626667',
					background: '#D9DCDD',
					borderColor: '#B5BDC2',
					'&.Mui-selected:hover': {
						backgroundColor: '#D2D5D7',
					},
				},
			},
		},
		MuiToggleButtonGroup: {
			groupedHorizontal: {
				'&:not(:first-child)': {
					borderLeftColor: '#B5BDC2',
				},
			},
		},
		MuiTouchRipple: {
			child: {
				backgroundColor: grey[400],
			},
		},
		MuiTab: {
			root: {
				transition: 'all .3s ease',
				'&:hover': {
					color: blueGrey[800],
					borderRadius: '3px 3px 0 0',
				},
			},
		},
		MuiTypography: {
			colorTextSecondary: {
				color: '#6C767A',
			},
		},
		MuiAppBar: {
			colorDefault: {
				backgroundColor: '#fff',
			},
		},
		MuiSwitch: {
			track: {
				backgroundColor: blueGrey[800],
			},
		},
		MuiPaper: {
			elevation1: {
				boxShadow:
					'0px 20px 40px -22px rgba(0, 0, 0, 0.1), 0px -2px 9px -13px rgba(0, 0, 0, 0.5), 0px -2px 21px -21px rgba(0, 0, 0, 0.5), 0px 1px 1px -1px rgba(0, 0, 0, 0.075), 0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.08)',
			},
			elevation8: {
				boxShadow:
					'0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.05),0 16px 32px rgba(0,0,0,0.05), 0 32px 64px rgba(0,0,0,0.05)',
			},
		},
		MuiLink: {
			root: {
				'&:hover': {
					color: '#000',
				},
			},
		},
	},
});

export default lightTheme;
