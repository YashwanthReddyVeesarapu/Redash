import React from "react";
import MainLayout from "../layouts/MainLayout";
import { getAuth } from "firebase/auth";
import { Button } from "@mui/material";

const ProfilePage = () => {
  const auth = getAuth();
  return (
    <MainLayout>
      <Button onClick={() => auth.signOut()}>Logout</Button>
    </MainLayout>
  );
};

export default ProfilePage;
