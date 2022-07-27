import { createTheme } from '@mui/material';

const textColorSecondary = '#b3c5cd';

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontStyle: 'normal',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: '#252329',
          color: 'white',
          '& svg': {
            color: 'white',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          textTransform: 'capitalize',
          fontSize: 'inherit',
          fontStyle: 'normal',
          boxSizing: 'border-box',
          color: 'white!important',
          height: '100%',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        colorPrimary: {
          color: '#252329',
          '&.Mui-checked': {
            color: '#120f13',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        textAlignLeft: {
          borderWidth: 20,
          marginTop: 50,
          fontSize: 40,
          '&:first-child': {
            marginTop: 10,
          },
        },
      },
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    h1: {
      fontSize: 60,
      fontWeight: 400,
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 20,
    },
    h2: {
      fontSize: 45,
      fontWeight: 400,
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 20,
    },
    h3: {
      fontSize: 24,
      fontWeight: 400,
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 20,
    },
    cardTitle: {
      fontWeight: 600,
      fontSize: '1.3em',
    },
    subtitle1: {
      color: textColorSecondary,
      textAlign: 'center',
      marginBottom: 20,
    },
    body1: {
      fontWeight: 400,
      fontSize: 16,
      fontStretch: '100%',
    },
    button: {
      fontStyle: 'italic',
    },
    journal: {
      fontSize: 60,
      fontFamily: "'Just Another Hand', cursive",
    },
  },
});

export default theme;
