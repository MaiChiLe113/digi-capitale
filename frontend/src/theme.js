import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D6B585", // Orange-gold accent
      light: "#E8C8A0", // Lighter orange
      dark: "#C4924A", // Darker orange
      contrastText: "#FFFFFB", // White text on orange
    },
    secondary: {
      main: "#2C325B", // Navy blue (header/footer)
      light: "#2F3E6F", // Lighter navy
      dark: "#0F1A2E", // Darker navy
      contrastText: "#FFFFFB", // White text on navy
    },
    text: {
      primary: "#2C325B", // Dark navy for main text
      secondary: "#64748B", // Slate gray for secondary text
      disabled: "#CBD5E1", // Light slate for disabled text
    },
    background: {
      default: "#F8FAFC", // Very light gray/blue
      paper: "#FFFFFF", // White for cards and containers
    },
    error: {
      main: "#EF4444", // Red for errors
      light: "#FCA5A5",
      dark: "#DC2626",
    },
    warning: {
      main: "#EAB308", // Yellow for pending/warnings
      light: "#FEFCE8",
      dark: "#CA8A04",
    },
    success: {
      main: "#5FBD54", // Green for success/paid
      light: "#d3ffceff",
      dark: "#518a4bff",
    },
    info: {
      main: "#0EA5E9", // Light blue for info
      light: "#CFF0FF",
      dark: "#0284C7",
    },
    divider: "#E2E8F0", // Light border color
  },

  typography: {
    fontFamily: `'Urbanist', 'Roboto', 'Helvetica', 'Arial', sans-serif`,

    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
      color: "#2C325B",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.25px",
      color: "#D6B585",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
      color: "#2C325B",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
      color: "#1A1A2E",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#1A1A2E",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#1A1A2E",
    },

    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      color: "#1A1A2E",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.57,
      color: "#64748B",
    },

    subtitle1: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.56,
      color: "#1A1A2E",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.57,
      color: "#64748B",
    },

    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.67,
      color: "#64748B",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 700,
      lineHeight: 1.67,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      color: "#64748B",
    },
  },

  shape: {
    borderRadius: 24, // Rounded corners matching design (48px = 24 in standard MUI units)
  },

  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.08)",
    "0px 10px 50px rgba(110, 67, 15, 0.15)",
    "0px 20px 40px rgba(0, 0, 0, 0.1)",
    "0px 25px 50px rgba(0, 0, 0, 0.15)",
    // ... rest of shadows with similar depth
    ...Array(19).fill("0px 0px 0px rgba(0, 0, 0, 0)"),
  ],

  components: {
    // MuiCssBaseline: {
    //   styleOverrides: {
    //     html: {
    //       fontFamily:
    //         '"Urbanist", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
    //     },
    //     body: {
    //       fontFamily:
    //         '"Urbanist", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
    //     },
    //   },
    // },
    MuiContainer: {
      styleOverrides: {
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "flex-start",
        margin: 10,
      },
    },
    MuiBox: {
      styleOverrides: {
        display: "flex",
        flexDirection: "column",
        gap: 1,
        alignItems: "flex-start",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 650,
          fontSize: "1rem",
          borderRadius: "100px", // Fully rounded
          padding: "8px 20px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 10px 20px rgba(212, 161, 96, 0.2)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(120deg, #D6B585 0%, #D49951 100%)",
          "&:hover": {
            boxShadow: "0px 10px 20px rgba(212, 161, 96, 0.2)",
          },
          "&:disabled": {
            background: "#E2E8F0",
            color: "#CBD5E1",
          },
        },
        containedSecondary: {
          background: "#1E2E52",
          color: "#FFFFFF",
          "&:hover": {
            background: "#0F1A2E",
          },
          "&:disabled": {
            background: "#E2E8F0",
            color: "#CBD5E1",
          },
        },
        outlined: {
          borderColor: "#D6B585",
          color: "#D6B585",
          borderWidth: "1px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",

          "&:hover": {
            borderColor: "#C4924A",
            backgroundColor: "rgba(255, 255, 255, 0.55)",
          },
        },
        outlinedSecondary: {
          borderColor: "#1E2E52",
          color: "#1E2E52",
          borderWidth: "2px",
          "&:hover": {
            borderColor: "#0F1A2E",
            backgroundColor: "rgba(30, 46, 82, 0.05)",
          },
        },
        text: {
          color: "#D4A160",
          "&:hover": {
            backgroundColor: "rgba(212, 161, 96, 0.08)",
          },
        },
        textSecondary: {
          color: "#1E2E52",
          "&:hover": {
            backgroundColor: "rgba(30, 46, 82, 0.08)",
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
            backgroundColor: "#F8FAFC",
            transition: "all 0.3s ease",
            "& fieldset": {
              borderColor: "#E2E8F0",
              borderWidth: "1px",
            },
            "&:hover fieldset": {
              borderColor: "#CBD5E1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D4A160",
              borderWidth: "2px",
            },
            "&.Mui-error fieldset": {
              borderColor: "#EF4444",
            },
          },
          "& .MuiOutlinedInput-input": {
            fontSize: "1rem",
            color: "#1A1A2E",
            "&::placeholder": {
              color: "#CBD5E1",
              opacity: 1,
            },
          },
          "& .MuiInputBase-input.Mui-disabled": {
            backgroundColor: "#F1F5F9",
            color: "#CBD5E1",
          },
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#F8FAFC",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "#F1F5F9",
          },
          "&.Mui-focused": {
            backgroundColor: "#F8FAFC",
          },
          "& .MuiFilledInput-underline": {
            borderBottomColor: "#D4A160",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "0px 10px 50px rgba(110, 67, 15, 0.15)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 15px 60px rgba(110, 67, 15, 0.2)",
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "8px",
          "&.Mui-checked": {
            color: "#D4A160",
          },
          "&.Mui-disabled": {
            color: "#CBD5E1",
          },
        },
      },
    },

    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#CBD5E1",
          "&.Mui-checked": {
            color: "#D4A160",
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: "8px",
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#D4A160",
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#D4A160",
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          fontWeight: 600,
          fontSize: "0.875rem",
        },
        colorPrimary: {
          backgroundColor: "rgba(212, 161, 96, 0.1)",
          color: "#D4A160",
        },
        colorSecondary: {
          backgroundColor: "rgba(30, 46, 82, 0.1)",
          color: "#1E2E52",
        },
        filled: {
          backgroundColor: "rgba(212, 161, 96, 0.15)",
          "&.MuiChip-filledSuccess": {
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            color: "#10B981",
          },
          "&.MuiChip-filledError": {
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            color: "#EF4444",
          },
          "&.MuiChip-filledWarning": {
            backgroundColor: "rgba(234, 179, 8, 0.1)",
            color: "#EAB308",
          },
        },
      },
    },

    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            borderRadius: "12px",
            color: "#64748B",
            "&.Mui-selected": {
              backgroundColor: "#D4A160",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#C4924A",
              },
            },
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E2E52",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          color: "#FFFFFF",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E2E8F0",
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          fontSize: "0.875rem",
          fontWeight: 500,
        },
        standardSuccess: {
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          color: "#10B981",
          border: "1px solid rgba(16, 185, 129, 0.3)",
        },
        standardError: {
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          color: "#EF4444",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        },
        standardWarning: {
          backgroundColor: "rgba(234, 179, 8, 0.1)",
          color: "#EAB308",
          border: "1px solid rgba(234, 179, 8, 0.3)",
        },
        standardInfo: {
          backgroundColor: "rgba(14, 165, 233, 0.1)",
          color: "#0EA5E9",
          border: "1px solid rgba(14, 165, 233, 0.3)",
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #E2E8F0",
        },
        indicator: {
          backgroundColor: "#D4A160",
          height: "3px",
          borderRadius: "2px",
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "#64748B",
          textTransform: "none",
          "&.Mui-selected": {
            color: "#D4A160",
          },
          "&:hover": {
            color: "#D4A160",
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "24px",
          backgroundColor: "#FFFFFF",
        },
      },
    },

    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          marginTop: "8px",
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.15)",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.95rem",
          color: "#1A1A2E",
          borderRadius: "8px",
          margin: "4px 8px",
          "&:hover": {
            backgroundColor: "rgba(212, 161, 96, 0.1)",
            color: "#D4A160",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(212, 161, 96, 0.15)",
            color: "#D4A160",
            "&:hover": {
              backgroundColor: "rgba(212, 161, 96, 0.2)",
            },
          },
        },
      },
    },

    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: "#D4A160",
          color: "#FFFFFF",
          fontWeight: 600,
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#D4A160",
          color: "#FFFFFF",
          fontWeight: 700,
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          backgroundColor: "rgba(212, 161, 96, 0.1)",
        },
        bar: {
          borderRadius: "4px",
          background: "linear-gradient(90deg, #D4A160 0%, #C4924A 100%)",
        },
      },
    },

    MuiSnackbar: {
      styleOverrides: {
        root: {
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#1E2E52",
            borderRadius: "12px",
            boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1E2E52",
          color: "#FFFFFF",
          borderRadius: "8px",
          fontSize: "0.875rem",
          fontWeight: 500,
          padding: "8px 12px",
        },
        arrow: {
          color: "#1E2E52",
        },
      },
    },
  },
});

export default theme;
