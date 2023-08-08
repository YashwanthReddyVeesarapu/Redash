import React, { useEffect, useState } from "react";
import { apiInstance } from "../utils/apiInstance";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  Button,
  CircularProgress,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions";

import "./styles.scss";
import CustomButton from "../components/CustomButton";

const ProductPage = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [clr, setClr] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

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
            <meta itemprop="name" content={product.name} />

            <h3 className="price">${product.price}</h3>
            <meta itemprop="price" content={product.price} />
            <meta itemprop="priceCurrency" content="USD" />
            <link itemprop="url" href={window.location.href} />
            <meta
              itemprop="itemCondition"
              content="https://schema.org/NewCondition"
            />
            <meta
              itemprop="availability"
              content="https://schema.org/InStock"
            />

            <meta itemProp="description" content={product.about} />
            <p>{product.about}</p>
            <meta
              itemprop="brand"
              itemType="https://schema.org/Brand"
              content={product.brand}
            />

            <div
              itemProp="offers"
              itemType="https://schema.org/Offer"
              itemScope
            >
              <link itemprop="url" href={window.location.href} />
              <meta
                itemprop="itemCondition"
                content="https://schema.org/NewCondition"
              />
              <meta
                itemprop="availability"
                content="https://schema.org/InStock"
              />
              <meta itemprop="price" content={product.price} />
              <meta itemprop="priceCurrency" content="USD" />
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
                <meta itemprop="value" content="0" />
                <meta itemprop="currency" content="USD" />
              </div>
              <div
                itemprop="shippingDestination"
                itemtype="https://schema.org/DefinedRegion"
                itemscope
              >
                <meta itemprop="addressCountry" content="US" />
              </div>

              <div
                itemprop="deliveryTime"
                itemtype="https://schema.org/ShippingDeliveryTime"
                itemscope
              >
                <div
                  itemprop="handlingTime"
                  itemtype="https://schema.org/QuantitativeValue"
                  itemscope
                >
                  <meta itemprop="minValue" content="0" />
                  <meta itemprop="maxValue" content="1" />
                  <meta itemprop="unitCode" content="DAY" />
                </div>
                <div
                  itemprop="transitTime"
                  itemtype="https://schema.org/QuantitativeValue"
                  itemscope
                >
                  <meta itemprop="minValue" content="1" />
                  <meta itemprop="maxValue" content="5" />
                  <meta itemprop="unitCode" content="DAY" />
                </div>
              </div>

              <div
                itemprop="hasMerchantReturnPolicy"
                itemtype="https://schema.org/MerchantReturnPolicy"
                itemscope
              >
                <meta itemprop="applicableCountry" content="US" />
                <meta
                  itemprop="returnPolicyCategory"
                  content="https://schema.org/MerchantReturnFiniteReturnWindow"
                />
                <meta itemprop="merchantReturnDays" content="15" />
                <meta
                  itemprop="returnMethod"
                  content="https://schema.org/ReturnByMail"
                />
                <meta
                  itemprop="returnFees"
                  content="https://schema.org/FreeReturn"
                />
              </div>
            </div>

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
              <InputLabel id="size-label">Size</InputLabel>
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
    </MainLayout>
  );
};

export default ProductPage;
