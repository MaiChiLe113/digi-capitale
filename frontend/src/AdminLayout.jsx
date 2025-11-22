import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import AdminHeader from "./components/AdminHeader.tsx";

const AdminLayout = () => {
  return (
    <>
        <AdminHeader />
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
    </>
  );
};

export default AdminLayout;
