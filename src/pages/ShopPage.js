import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Product from "../components/Product";
import { useEffect } from "react";
import { apiInstance } from "../utils/apiInstance";
import { CircularProgress, LinearProgress } from "@mui/material";

const ShopPage = () => {
  const [products, setProducts] = useState([]);

  const [pagenum, setPagnum] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiInstance
      .get(`/products/${pagenum}`)
      .then((res) => {
        setProducts(res.data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <MainLayout>
        <CircularProgress />
      </MainLayout>
    );

  return (
    <MainLayout page={"shop"}>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((p, i) => <Product {...p} key={i} />)
      ) : (
        <>
          <p>Something went wrong, Sorry for the inconvinence.</p>
          <p>This issue has been reported</p>
        </>
      )}
    </MainLayout>
  );
};

export default ShopPage;
