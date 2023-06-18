import React from "react";
import "./styles.scss";
import { ShoppingBasket, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Badge, IconButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import logo from "./../../assets/Logo.png";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = ({ page }) => {
  console.log(page);
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();
  return (
    <header>
      <div className="header-left" onClick={() => navigate("/")}>
        {/* <img height={"40px"} width={"100%"} src={logo} /> */}
        <h1>redash</h1>
      </div>

      <div className="header-right">
        {page == "home" && (
          <div onClick={() => navigate("/shop")}>
            <h2>Shop</h2>
          </div>
        )}
        <IconButton aria-label="cart" onClick={() => navigate("/cart")}>
          <StyledBadge badgeContent={cart.products.length} color="secondary">
            <ShoppingCart style={{ color: "white" }} />
          </StyledBadge>
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
