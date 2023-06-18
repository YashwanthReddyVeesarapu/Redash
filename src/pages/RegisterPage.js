import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Alert, Button, Input, Snackbar } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const auth = getAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { state } = useLocation();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (state?.message) {
      setOpen({ severity: state.severity, message: state.message });
      navigate("/register", { replace: true });
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, email, password, cpassword } = e.target;
    name = name.value;
    email = email.value;
    password = password.value;
    cpassword = cpassword.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      setOpen({ severity: "success", message: "Sign up succes!" });
      auth.signOut();

      navigate("/login", {
        state: {
          severity: "info",
          message: "You can now login with your credentials",
        },
      });
    } catch (error) {
      setOpen({ severity: "error", message: "Registration failure!" });
    }
  };
  return (
    <MainLayout>
      <h2>Register</h2>
      <form className="registerForm" onSubmit={(e) => handleSubmit(e)}>
        <Input name="name" placeholder="Full Name" />
        <Input name="email" placeholder="Email" />
        <Input name="password" placeholder="Password" />
        <Input name="cpassword" placeholder="Confirm Password" />

        <Button type="submit" variant={"contained"}>
          Create Account
        </Button>
      </form>
      <Link to={"/login"}>Already with us?</Link>

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

export default RegisterPage;
