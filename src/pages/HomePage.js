import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Product from "../components/Product";
import { Alert, Snackbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (state?.message) {
      setOpen({ severity: state.severity, message: state.message });
      navigate("/", { replace: true });
    }
  }, [state]);
  return (
    <MainLayout page="home">
      HomePage
      <Snackbar
        open={open.severity != null}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={open.severity}
          sx={{ width: "100%" }}
        >
          {open.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default HomePage;
