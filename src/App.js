import "./App.css";
import HomePage from "./pages/home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShoppingPage from "./pages/shopping/ShoppingPage";
import ContactUsPage from "./pages/contact/ContactUsPage";
import CartPage from "./pages/cart/CartPage";
import CheckOut from "./pages/check-out/CheckOut";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/shopping" element={<ShoppingPage/>}></Route>
          <Route path="/contact" element={<ContactUsPage/>}></Route>
          <Route path="/cart" element={<CartPage/>}></Route>
          <Route path="/checkout" element={<CheckOut/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
