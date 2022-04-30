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
