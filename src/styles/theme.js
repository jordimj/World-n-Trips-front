import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontStyle: 'normal',
          color: 'var(--text-color)',
          '&.Mui-selected': {
            color: 'var(--text-color)',
          },
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
          backgroundColor: 'var(--navbar-color)',
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
          color: 'var(--navbar-color)',
          '&.Mui-checked': {
            color: 'var(--background-color-light)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        withChildren: {
          borderWidth: 20,
          fontSize: 40,
          width: '80%',
          marginTop: 20,
          textAlign: '-webkit-center',
        },
        textAlignLeft: {
          width: '100%',
          marginTop: 50,
          '&:first-of-type': {
            marginTop: 10,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          textTransform: 'capitalize',
          border: 'var(--border)',
        },
        sizeMedium: {
          fontSize: 16,
          color: 'var(--text-color)',
          padding: 5,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        colorPrimary: {
          color: 'var(--navbar-color)!important',
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
      fontSize: 22,
      letterSpacing: 'var(--uppercase-letter-spacing)',
    },
    subtitle1: {
      fontSize: 16,
      color: 'var(--text-color-secondary)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--uppercase-letter-spacing)',
    },
    subtitle2: {
      color: 'var(--text-color-secondary)',
      fontSize: 16,
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
      fontFamily: 'Just Another Hand, cursive',
      hyphens: 'auto',
      textAlign: 'justify',
      textIndent: 'var(--spacing-7)',
      lineHeight: '1.3em',
    },
  },
});

export default theme;
