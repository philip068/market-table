import { cyan, pink, blueGrey, red } from '@mui/material/colors';
import { createTheme, ThemeOptions } from '@mui/material/styles';

const commonSettings: ThemeOptions = {
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '1.5rem', 
      },
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', 
            transform: 'translateY(-1px)',
          },
          borderRadius: '8px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', 
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)', 
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: 'primary.main',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: {
      main: cyan[700], 
      contrastText: '#ffffff',
    },
    secondary: {
      main: pink[400], 
      contrastText: '#ffffff',
    },
    background: {
      default: blueGrey[50],
      paper: '#ffffff',  
    },
    text: {
      primary: blueGrey[900], 
      secondary: blueGrey[600], 
    },
    error: {
      main: red[400],
    },
  },
});

export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'dark',
    primary: {
      main: cyan[300],
      contrastText: '#121212',
    },
    secondary: {
      main: pink[200],
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#ffffff',
      secondary: blueGrey[400],
    },
    error: {
      main: red[200],
    },
  },
});
