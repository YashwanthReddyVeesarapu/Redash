import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminLayout = (props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>

      <Footer />
    </>
  );
};

export default AdminLayout;
