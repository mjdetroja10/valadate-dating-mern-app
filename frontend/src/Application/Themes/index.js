import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#F9DB6D',
            dark: '#FDEAb6',
        },
        black: {
            main: '#0C0E10',
            medium: '#2E353E',
            light: '#72859A',
        },
        blue: {
            b100: '#B5D4F6',
            b300: '#98C4F2',
            b500: '#5AA1EC',
            b700: '#145CA8',
        },
        white: {
            main: '#FBFDFF',
        },
    },
    typography: {
        fontFamily: 'Raleway',
        fontWeightBold: 600,
        fontWeightRegular: 300,
        h1: {
            fontSize: '60px',
            lineHeight: 'auto',
            fontWeight: 'bold',
        },
        h2: {
            fontSize: '48px',
            lineHeight: 'auto',
            fontWeight: 'bold',
        },
        h3: {
            fontSize: '40px',
            lineHeight: 'auto',
            fontWeight: 'bold',
        },
        h4: {
            fontSize: '24px',
            lineHeight: 'auto',
            fontWeight: 'bold',

            '@media (max-width:767px)': {
                fontSize: '18px',
            },
        },
        h5: {
            fontSize: '20px',
            lineHeight: 'auto',
            fontWeight: 'regular',
        },
        h6: {
            fontSize: '18px',
            lineHeight: 'auto',
            fontWeight: 'regular',
        },
        body1: {
            fontSize: '16px',
            lineHeight: 'auto',
        },
        body2: {
            fontSize: '14px',
            lineHeight: 'auto',
        },
        body3: {
            fontSize: '10px',
            lineHeight: 'auto',
        },
    },
    shadows: ['4px 4px 8px rgba(0, 0, 0, 0.15)', '0px 1px 8px rgba(0, 0, 0, 0.05)', 'none'],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box',
                },
                html: {
                    MozOsxFontSmoothing: 'grayscale',
                    WebkitFontSmoothing: 'antialiased',
                    height: '100%',
                    width: '100%',
                    fontSize: '14px',
                },
                body: {
                    height: '100%',
                    fontSize: '1rem',
                },
                a: {
                    textDecoration: 'none',
                },
                '#__next': {
                    height: '100%',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#2E353E',
                    fontSize: '20px',
                    lineHeight: 'auto',
                    fontWeight: 500,
                    fontFamily: 'Josefin Sans',
                    '&.MuiInputLabel-sizeSmall': {
                        fontSize: '0.8571rem',
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    '& .MuiFormHelperText-root': {
                        fontSize: '16px',
                        fontWeight: 600,
                    },
                },
            },

            defaultProps: {
                fullWidth: true,
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    color: '#2E353E',
                    border: '1px solid #72859A',
                    fontSize: '20px',
                    fontWeight: 500,
                    padding: '0 15px',
                    borderRadius: '8px',

                    '&::before': {
                        display: 'none',
                    },

                    '&::after': {
                        display: 'none',
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#72859A',
                    '&.Mui-checked': {
                        color: '#145CA8',
                    },
                },
            },
        },
        MuiModal: {
            styleOverrides: {
                root: {
                    '& > .MuiBox-root': {
                        outline: 'none',
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                root: {
                    width: 260,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 260,
                        boxSizing: 'border-box',
                        top: '90px',
                        boxShadow: 'none',
                        border: 'none',
                    },
                    '& .MuiButtonBase-root': {
                        marginTop: '12px',
                        marginBottom: '12px',
                        '& .MuiListItemText-primary': {
                            fontSize: '20px',
                        },
                        '&:hover': {
                            backgroundColor: '#E1EEFC',
                            '& .MuiListItemText-primary': {
                                fontWeight: 600,
                            },
                        },
                    },
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    color: '#145CA8',
                    height: 10,
                    marginBottom: 60,

                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#145CA8',
                    },
                },
            },
        },
    },
})

export default theme
