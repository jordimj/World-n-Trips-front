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
          borderRadius: 'var(--border-radius)',
          borderTopLeftRadius: 'var(--border-radius)!important',
          borderTopRightRadius: 'var(--border-radius)!important',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--primary-color-900)',
          color: 'white',
          '& svg': {
            color: 'white',
          },
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          '.MuiButtonGroup-grouped:not(:last-of-type)': {
            borderColor: 'var(--primary-color-900)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textDecoration: 'none!important',
          textTransform: 'capitalize',
          fontSize: 'inherit',
          fontStyle: 'normal',
          boxSizing: 'border-box',
          color: 'white!important',
          height: '100%',
          minWidth: '100px',
          backgroundColor: 'var(--primary-color-700)',
          ':hover': {
            backgroundColor: 'var(--primary-color-900)',
          },
        },
        outlinedSecondary: {
          backgroundColor: 'white',
          color: 'var(--primary-color-700)!important',
          ':hover': {
            backgroundColor: 'var(--primary-color-100)',
          },
        },
        text: {
          color: 'var(--text-color)!important',
          backgroundColor: 'transparent',
          textTransform: 'none',
          textDecoration: 'underline',
          ':hover': {
            textDecoration: 'underline',
            backgroundColor: 'var(--primary-color-100)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        colorSecondary: {
          color: 'white',
          '&:hover': { backgroundColor: 'var(--primary-color-900)' },
          '&:focus': { backgroundColor: 'var(--primary-color-900)' },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        colorPrimary: {
          color: 'var(--primary-color-700)',
          '&.Mui-checked': {
            color: 'var(--primary-color-900)',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        colorPrimary: {
          color: 'var(--primary-color-700)',
        },
        markLabel: {
          color: 'var(--secondary-color)',
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
          color: 'var(--primary-color-700)!important',
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-completed': {
            color: 'var(--primary-color-700)',
          },
          '&.Mui-active': {
            color: 'var(--primary-color-700)',
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
