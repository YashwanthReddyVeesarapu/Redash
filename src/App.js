import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useEffect, useState } from "react";
import CustomisePage from "./pages/CustomisePage";
import ShopPage from "./pages/ShopPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PreLaunchPage from "./pages/PreLaunchPage";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import OrderPlacedPage from "./pages/OrderPlacedPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [open, setOpen] = useState({});
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, (user) => {
    setLoading(false);
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({});
  };

  if (loading)
    return (
      <MainLayout page={"loading"} setOpen={setOpen}>
        <CircularProgress style={{ color: "white" }} />{" "}
      </MainLayout>
    );
  return (
    <div className="App">
      <Routes>
        <Route
          path="/about"
          element={
            <HomePage />
            // user ? (
            //   <HomePage />
            // ) : (
            //   <Navigate
            //     to={"/login"}
            //     state={{
            //       message: "You need to be logged in to access our site",
            //     }}
            //   />
            // )
          }
        />
        <Route path="/login" element={<LoginPage setOpen={setOpen} />} />
        <Route path="/register" element={<RegisterPage setOpen={setOpen} />} />

        <Route path="/custom" element={<CustomisePage />} />

        <Route path="/" element={<ShopPage setOpen={setOpen} />} />
        <Route path="/profile" element={<ProfilePage setOpen={setOpen} />} />
        <Route path="/hellobello" element={<AdminPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/checkout/success"
          element={<OrderPlacedPage setOpen={setOpen} />}
        />

        <Route path="/checkout" element={<CheckoutPage />} />
        <Route exact path="*" element={<NotFoundPage />} />
      </Routes>

      <Snackbar
        open={open.severity != null}
        autoHideDuration={3000}
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
    </div>
  );
}

export default App;
