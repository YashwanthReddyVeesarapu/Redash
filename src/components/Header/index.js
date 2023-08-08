import React, { useState } from "react";
import "./styles.scss";
import {
  AccountCircle,
  Login,
  Person,
  ShoppingBasket,
  ShoppingCart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Badge, IconButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import logo from "./../../assets/Logo.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = ({ page }) => {
  const { cart } = useSelector((state) => state);
  const auth = getAuth();
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-left" onClick={() => navigate("/")}>
        {/* <img height={"40px"} width={"100%"} src={logo} /> */}
        <h1>Redash</h1>
      </div>

      <div className="header-right">
        {page == "home" && (
          <div onClick={() => navigate("/")}>
            <h2>Shop</h2>
          </div>
        )}

        {page != "home" && (
          <div onClick={() => navigate("/about")}>
            <h2>About</h2>
          </div>
        )}

        {auth.currentUser
          ? page !== "profile" && (
              <IconButton onClick={() => navigate("/profile")}>
                <Person style={{ color: "white", fontSize: "30px" }} />
              </IconButton>
            )
          : page !== "login" &&
            page !== "loading" && (
              <IconButton onClick={() => navigate("/login")}>
                <Login style={{ color: "white" }} />
              </IconButton>
            )}
        {page !== "prelaunch" && (
          <IconButton aria-label="cart" onClick={() => navigate("/cart")}>
            <StyledBadge badgeContent={cart.products.length} color="secondary">
              <ShoppingCart style={{ color: "white" }} />
            </StyledBadge>
          </IconButton>
        )}
      </div>
    </header>
  );
};

export default Header;
