import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#123456', // Replace with your primary color
    },
    // Add other palette options as needed
  },
  components: {
    // Style overrides for TableContainer
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          // Add any other styles you want to apply globally
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#123456', // Match with primary color or use a different one
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#abcdef', // Highlight color for selected tab
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#abcdef', // Color of the indicator bar
          height: '4px', // Thickness of the indicator bar
        },
      },
    },
  },
});

export default theme;