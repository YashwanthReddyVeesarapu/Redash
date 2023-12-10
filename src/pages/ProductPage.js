import React, { useEffect, useState } from "react";
import { apiInstance } from "../utils/apiInstance";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  Box,
  Button,
  CircularProgress,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";

import chart from "./../assets/charts/3001.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions";

import "./styles.scss";
import CustomButton from "../components/CustomButton";
import { HelpOutline } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductPage = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [clr, setClr] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [openChart, setOpenChart] = useState(false);

  const { productId } = useParams();

  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state);

  useEffect(() => {
    apiInstance.get(`/products/product/${productId}`).then((res) => {
      setProduct(res.data);
      setClr(res.data.colors[0]);
      setSize(res.data.sizes[0]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!product) return;
    setImage(product.images[`${clr}`]);
  }, [clr]);

  const isAlreadyInCart = () => {
    let cartProducts = cart.products;
    for (let i = 0; i < cartProducts.length; i++) {
      if (
        cartProducts[i]._id == productId &&
        cartProducts[i].color == clr &&
        cartProducts[i].size == size
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <MainLayout>
      {loading ? (
        <CircularProgress style={{ color: "white" }} />
      ) : (
        <div
          className="product-layout"
          itemType="https://schema.org/Product"
          itemScope
        >
          <meta itemProp="sku" content={product._id} />

          <img className="img-container" src={image} />
          <meta
            itemProp="image"
            content={`https://api.redash.us/images/${product._id}`}
          />

          <div className="product-details">
            <h2>{product.name}</h2>
            <meta itemProp="name" content={product.name} />

            <h3 className="price">${product.price}</h3>
            <div
              itemProp="offers"
              itemType="https://schema.org/Offer"
              itemScope
            >
              <link itemProp="url" href={window.location.href} />
              <meta
                itemProp="itemCondition"
                content="https://schema.org/NewCondition"
              />
              <meta
                itemProp="availability"
                content="https://schema.org/InStock"
              />
              <meta itemProp="price" content={product.price} />
              <meta itemProp="priceValidUntil" content="2024-01-01" />
              <meta itemProp="priceCurrency" content="USD" />
              <div
                itemProp="eligibleRegion"
                itemScope
                itemType="http://schema.org/Place"
              >
                <meta itemProp="name" content="United States" />
                <meta itemProp="taxRegion" content="tax-exempt" />
              </div>
              <div
                itemProp="hasMerchantReturnPolicy"
                itemType="https://schema.org/MerchantReturnPolicy"
                itemScope
              >
                <meta itemProp="applicableCountry" content="US" />
                <meta
                  itemProp="returnPolicyCategory"
                  content="https://schema.org/MerchantReturnFiniteReturnWindow"
                />
                <meta itemProp="merchantReturnDays" content="15" />
                <meta
                  itemProp="returnMethod"
                  content="https://schema.org/ReturnByMail"
                />
                <meta
                  itemProp="returnFees"
                  content="https://schema.org/FreeReturn"
                />
              </div>

              <div
                itemProp="shippingDetails"
                itemType="https://schema.org/OfferShippingDetails"
                itemScope
              >
                <div
                  itemProp="shippingRate"
                  itemType="https://schema.org/MonetaryAmount"
                  itemScope
                >
                  <meta itemProp="value" content="0" />
                  <meta itemProp="currency" content="USD" />
                </div>
                <div
                  itemProp="shippingDestination"
                  itemType="https://schema.org/DefinedRegion"
                  itemScope
                >
                  <meta itemProp="addressCountry" content="US" />
                </div>

                <div
                  itemProp="deliveryTime"
                  itemType="https://schema.org/ShippingDeliveryTime"
                  itemScope
                >
                  <div
                    itemProp="handlingTime"
                    itemType="https://schema.org/QuantitativeValue"
                    itemScope
                  >
                    <meta itemProp="minValue" content="0" />
                    <meta itemProp="maxValue" content="1" />
                    <meta itemProp="unitCode" content="DAY" />
                  </div>
                  <div
                    itemProp="transitTime"
                    itemType="https://schema.org/QuantitativeValue"
                    itemScope
                  >
                    <meta itemProp="minValue" content="1" />
                    <meta itemProp="maxValue" content="5" />
                    <meta itemProp="unitCode" content="DAY" />
                  </div>
                </div>

                <div
                  itemProp="hasMerchantReturnPolicy"
                  itemType="https://schema.org/MerchantReturnPolicy"
                  itemScope
                >
                  <meta itemProp="applicableCountry" content="US" />
                  <meta
                    itemProp="returnPolicyCategory"
                    content="https://schema.org/MerchantReturnFiniteReturnWindow"
                  />
                  <meta itemProp="merchantReturnDays" content="15" />
                  <meta
                    itemProp="returnMethod"
                    content="https://schema.org/ReturnByMail"
                  />
                  <meta
                    itemProp="returnFees"
                    content="https://schema.org/FreeReturn"
                  />
                </div>
              </div>
            </div>

            <div
              itemProp="aggregateRating"
              itemType="https://schema.org/AggregateRating"
              itemScope
            >
              <meta itemProp="reviewCount" content="1" />
              <meta itemProp="ratingValue" content="5" />
            </div>

            <div
              itemProp="review"
              itemType="https://schema.org/Review"
              itemScope
            >
              <div
                itemProp="author"
                itemType="https://schema.org/Person"
                itemScope
              >
                <meta itemProp="name" content="Yash" />
              </div>
              <div
                itemProp="reviewRating"
                itemType="https://schema.org/Rating"
                itemScope
              >
                <meta itemProp="ratingValue" content="5" />
                <meta itemProp="bestRating" content="5" />
              </div>
            </div>

            <meta itemProp="description" content={product.about} />
            <p>{product.about}</p>
            <meta
              itemProp="brand"
              itemType="https://schema.org/Brand"
              content={product.brand}
            />

            {/* <FormGroup>
              <InputLabel id="clr-label">Color</InputLabel>
              <Select
                id="clr"
                labelId="clr-label"
                label="Color"
                value={clr}
                onChange={(e) => setClr(e.target.value)}
              >
                {product.colors.map((c, i) => (
                  <MenuItem key={i} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormGroup> */}

            <div className="productColours">
              {product.colors.map((a, i) => {
                if (a === "white")
                  return (
                    <div
                      className={
                        clr === a ? "colourChildActive" : "colourChild"
                      }
                      key={i}
                      style={{ backgroundColor: "white" }}
                      onClick={() => setClr("white")}
                    />
                  );
                if (a === "black")
                  return (
                    <div
                      className={
                        clr === a ? "colourChildActive" : "colourChild"
                      }
                      key={i}
                      style={{ backgroundColor: "black" }}
                      onClick={() => setClr("black")}
                    />
                  );

                if (a === "coffee brown")
                  return (
                    <div
                      className={
                        clr === a ? "colourChildActive" : "colourChild"
                      }
                      key={i}
                      style={{ backgroundColor: "#914A37" }}
                      onClick={() => setClr("coffee brown")}
                    />
                  );
                if (a === "lavender")
                  return (
                    <div
                      className={
                        clr === a ? "colourChildActive" : "colourChild"
                      }
                      key={i}
                      style={{ backgroundColor: "#E6E6FA" }}
                      onClick={() => setClr("lavender")}
                    />
                  );
                if (a === "light baby pink")
                  return (
                    <div
                      className={
                        clr === a ? "colourChildActive" : "colourChild"
                      }
                      key={i}
                      style={{ backgroundColor: "#f4C2C2" }}
                      onClick={() => setClr("light baby pink")}
                    />
                  );
              })}
            </div>

            <FormGroup className="p-size">
              <InputLabel id="size-label">
                Size
                <IconButton
                  style={{ margin: 0, padding: 0 }}
                  onClick={() => setOpenChart(true)}
                >
                  <HelpOutline
                    style={{ margin: 1, padding: 0, fontSize: "0.9em" }}
                  />
                </IconButton>
              </InputLabel>
              <Select
                id="size"
                labelId="size-label"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {product.sizes.map((c, i) => (
                  <MenuItem key={i} value={c}>
                    {c.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormGroup>

            <CustomButton
              style={{
                color: isAlreadyInCart() ? "gray" : "white",
                backgroundColor: isAlreadyInCart() ? "white" : "black",
              }}
              onClick={() => {
                const cartItem = {
                  _id: product._id,
                  name: product.name,
                  quantity: qty,
                  color: clr,
                  price: product.price,
                  size: size,
                  brand: product.brand,
                  img: image,
                };
                if (isAlreadyInCart()) {
                  return alert("Product is already in your cart");
                }
                dispatch(addToCart(cartItem));
              }}
            >
              ADD TO CART
            </CustomButton>
          </div>
        </div>
      )}

      <Modal
        open={openChart}
        onClose={() => setOpenChart(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={chart} />
        </Box>
      </Modal>
    </MainLayout>
  );
};

export default ProductPage;
