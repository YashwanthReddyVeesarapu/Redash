import React from "react";
import "./styles.scss";
import { Link } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Link href="/about">About</Link>
      <Link href="/privacy">Privacy Policy</Link>
      <Link href="/contact">Contact Us</Link>
      <Link href="/returns">Returns</Link>
    </footer>
  );
};

export default Footer;
