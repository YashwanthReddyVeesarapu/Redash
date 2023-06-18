import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Alert, Button, Input, Snackbar } from "@mui/material";
import "./styles.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log(state);
  const auth = getAuth();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  console.log(state);

  useEffect(() => {
    if (state?.message) {
      setOpen({ severity: state.severity, message: state.message });
      navigate("/login", { replace: true });
    }
  }, [state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    let { email, password } = e.target;
    email = email.value;
    password = password.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", {
        state: {
          severity: "success",
          message: "Login succes!",
        },
      });
    } catch (error) {
      setOpen({ severity: "error", message: "Login failure!" });
    }
  };
  return (
    <MainLayout>
      <h2>Login</h2>
      <form className="loginForm" onSubmit={handleLogin}>
        <Input required name="email" placeholder="Email" />
        <Input required name="password" placeholder="Password" />
        <Button type={"submit"} variant={"contained"}>
          Login
        </Button>
      </form>
      <Link to={"/register"}>Not registered yet!</Link>
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

export default LoginPage;
