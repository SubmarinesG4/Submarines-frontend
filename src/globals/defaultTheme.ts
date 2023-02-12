import {
	createTheme, PaletteColor,
	PaletteColorOptions,
	ThemeOptions
} from '@mui/material';

declare module '@mui/material/styles' {
	interface Palette {
		active: PaletteColor;
		inactive: PaletteColor;
		textColor: PaletteColor;
	}
	interface PaletteOptions {
		active: PaletteColorOptions;
		inactive: PaletteColor;
		textColor: PaletteColor;
	}
}
const themeOptions: ThemeOptions = {
	palette: {
		active: {
			main: '#fdc30077',
			light: '#fdc300aa',
			dark: '#fdc300aa',
			contrastText: '#fdc300aa',
		},
		inactive: {
			main: '#bdbdbd',
			light: '#bdbdbd',
			dark: '#bdbdbd',
			contrastText: '#bdbdbd',
		},
		textColor: {
			main: '#000000',
			light: '#ffffff',
			dark: '#000000',
			contrastText: '#ffffff',
		},
	},
	typography: {
		fontFamily: ['Roboto', 'Condensed-Pro', 'Pro', 'Semi-Serif-Condensed-Pro'].join(','),
		h1: {
			fontWeight: 300,
			fontSize: '6rem',
			lineHeight: 1.167,
			letterSpacing: '-0.01562em',
		},
		h2: {
			fontWeight: 300,
			fontSize: '3.75rem',
			lineHeight: 1.2,
			letterSpacing: '-0.00833em',
		},
		h3: {
			fontWeight: 400,
			fontSize: '3rem',
			lineHeight: 1.167,
			letterSpacing: '0em',
		},
		h4: {
			fontWeight: 400,
			fontSize: '2.125rem',
			lineHeight: 1.235,
			letterSpacing: '0.00735em',
		},
		h5: {
			fontWeight: 400,
			fontSize: '1.5rem',
			lineHeight: 1.334,
			letterSpacing: '0em',
		},
		h6: {
			fontWeight: 500,
			fontSize: '1.25rem',
			lineHeight: 1.6,
			letterSpacing: '0.0075em',
		},
		subtitle1: {
			fontWeight: 400,
			fontSize: '1rem',
			lineHeight: 1.75,
			letterSpacing: '0.00938em',
		},
		subtitle2: {
			fontWeight: 500,
			fontSize: '0.875rem',
			lineHeight: 1.57,
			letterSpacing: '0.00714em',
		},
		body1: {
			fontWeight: 400,
			fontSize: '1rem',
			lineHeight: 1.5,
			letterSpacing: '0.00938em',
		},
		body2: {
			fontWeight: 400,
			fontSize: '0.875rem',
			lineHeight: 1.43,
			letterSpacing: '0.01071em',
		},
		button: {
			fontWeight: 500,
			fontSize: '0.875rem',
			lineHeight: 1.75,
			letterSpacing: '0.02857em',
			textTransform: 'uppercase',
		},
		caption: {
			fontWeight: 400,
			fontSize: '0.75rem',
			lineHeight: 1.66,
			letterSpacing: '0.03333em',
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					my: 2,
					width: '100%',
				},
			},
		},
	},
};

const defaultTheme = createTheme(themeOptions);
export default defaultTheme;
