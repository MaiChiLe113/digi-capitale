import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a', 
      light: '#666666', 
      dark: '#000000',
    },
    secondary: {
      main: '#f5f5f5', 
      light: '#fafafa', 
      dark: '#e0e0e0', 
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
      disabled: '#cccccc', 
    },
    background: {
      default: '#fafafa', 
      paper: '#ffffff',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#10b981',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 400,
          fontSize: '1rem',
          padding: '10px 24px',
          borderRadius: '8px',
          minWidth: '140px',
          height: '44px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            '& fieldset': {
              borderColor: '#f5f5f5',
            },
            '&:hover fieldset': {
              borderColor: '#666666',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1a1a1a',
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: '4px',
          '&.Mui-checked': {
            color: '#1a1a1a',
          },
        },
      },
    },
  },
});

export default theme;
