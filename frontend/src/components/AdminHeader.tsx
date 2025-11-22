import React from "react";
import { Box, Button, Link as MuiLink, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import theme from "../theme";
const Dlogo = "/images/Dlogo.svg";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: 1, name: "Dashboard", href: "/dashboard" },
    { id: 2, name: "Request", href: "/request" },
    { id: 3, name: "Report", href: "/report" },
    { id: 4, name: "Profile", href: "/employee-profile" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: theme.palette.secondary.main,
        px: { xs: 2, sm: 4, md: 8 },
        py: 1,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        gap: { xs: 2, md: 0 },
      }}
    >
      <img
        src={Dlogo}
        alt="D'Capitale logo"
        style={{ height: 60, width: "auto", objectFit: "contain" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: { xs: 1, sm: 2, md: 2 },
          flex: 1,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {navItems.map((item) => (
          <MuiLink
            key={item.id}
            component={Link}
            to={item.href}
            underline="none"
            sx={{
              color: "primary.contrastText",
              fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
              fontWeight: 500,
              transition: "color 0.3s ease",
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            {item.name}
          </MuiLink>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
        }}
      >
          <>
            <Typography
              variant="body1"
              sx={{
                color: "primary.contrastText",
                fontWeight: 500,
                fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
              }}
            >
              Hi, {user?.name || user?.email?.split("@")[0]}!
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
      </Box>
    </Box>
  );
};

export default Header;
