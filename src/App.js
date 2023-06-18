import {
  Navigate,
  Route,
  Routes,
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

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     setUser(user);
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //     setUser(null);
  //   }
  // });

  useEffect(() => {
    setUser(true);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/customise" element={<CustomisePage />} />

        <Route path="/shop" element={<ShopPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
