import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const AppLayout = () => {
  return (
    <>
      <Header />
      {/* <Container
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          marginTop: "70px",
        }}
      > */}
      <Outlet />
      {/* </Container> */}
      <Footer />
    </>
  );
};

export default AppLayout;
