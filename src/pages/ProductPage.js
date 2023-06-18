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
        <CircularProgress />
      ) : (
        <>
          <h2>{product.name}</h2>
          <p>{product.about}</p>

          <img className="img-container" src={image} />

          <FormGroup>
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
          </FormGroup>

          <FormGroup>
            <InputLabel id="size-label">Size</InputLabel>
            <Select
              id="size"
              labelId="size-label"
              label="Size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {product.sizes.map((c, i) => (
                <MenuItem key={i} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormGroup>

          <Button
            disabled={isAlreadyInCart()}
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
              dispatch(addToCart(cartItem));
            }}
          >
            {isAlreadyInCart()
              ? "Product is already in your cart"
              : " ADD TO CART"}
          </Button>
        </>
      )}
    </MainLayout>
  );
};

export default ProductPage;
