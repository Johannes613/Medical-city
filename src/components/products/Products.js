import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import medicalProducts from "./ProductList";
import { AiFillStar } from "react-icons/ai";
import { MdStarHalf } from "react-icons/md";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { GlobalContext } from "../../context/GlobalContext";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

export default function Products() {
  const { currentUser, setNumOfItems, numOfItems, cartItems, setCartItems } =
    useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(8);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentSorting, setCurrentSorting] = useState("default");
  const [currentProducts, setCurrentProducts] = useState(medicalProducts);
  const [searchInput, setSearchInput] = useState("");

  const fetchCartItems = async () => {
    if (currentUser) {
      const docRef = doc(db, "userCart", currentUser);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCartItems(data?.cart);
        console.log(data?.cart);
        setNumOfItems(data?.cart.length);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleAddToCart = async (itemId) => {
    if (currentUser) {
      setLoading(true);
      await updateDoc(doc(db, "userCart", currentUser), {
        cart: arrayUnion({ id: itemId, amount: 1 }),
      });
      await fetchCartItems();
    } else {
      toast.warn("Please sign in first");
    }
    setLoading(false);
  };

  let items = [];
  const numOfPages = Math.ceil(medicalProducts.length / productPerPage);
  for (let number = 1; number <= numOfPages; number++) {
    items.push(number);
  }
  
  useEffect(() => {
    let newProducts = [...medicalProducts];

    if (currentCategory !== "All") {
      newProducts = newProducts.filter(
        (prod) => prod.category === currentCategory
      );
    }

    if (searchInput.trim() !== "") {
      newProducts = newProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (currentSorting === "default") {
      newProducts = newProducts;
    } else if (currentSorting === "price") {
      newProducts = newProducts.sort((a, b) => a.price - b.price);
    } else if (currentSorting === "rating") {
      newProducts = newProducts.sort((a, b) => a.rating - b.rating);
    } else if (currentSorting === "popularity") {
      newProducts = newProducts.sort((a, b) => a.popularity - b.popularity);
    }

    setCurrentProducts(newProducts);

  }, [currentCategory, searchInput, currentSorting]);

  const lastIndex = currentPage * productPerPage;
  const firstIndex = lastIndex - productPerPage;
  const newList = currentProducts.slice(firstIndex, lastIndex);

  return (
    <>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeButton
      />
      <div className="products">
        <div className="container">
          <div className="row fac-head mb-5">
            <div className="col">
              <p className="text-uppercase mx-auto px-3 tag">Shopping</p>
              <h1 className="about-head">Feature Products</h1>
            </div>
          </div>
          <div className="row product-filters">
            <input
              type="text"
              className="select-cat"
              placeholder="Search products"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <select
              className="select-cat"
              name="cars"
              value={currentCategory}
              onChange={(e) => setCurrentCategory(e.target.value)}
              id="cars"
            >
              <option value="All">All</option>
              <option value="Medical Equipment">Medical Equipment</option>
              <option value="Sanitization">Sanitization</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Thermometers">Thermometers</option>
              <option value="Medicine">Medicine</option>
              <option value="Laboratory Equipment">Laboratory Equipment</option>
              <option value="Safety">Safety</option>
              <option value="Cylinder">Cylinder</option>
            </select>
            <select
              className="select-cat"
              name="cars"
              value={currentSorting}
              onChange={(e) => setCurrentSorting(e.target.value)}
              id="cars"
            >
              <option value="default">Default</option>
              <option value="price">Sort by price</option>
              <option value="rating">sort by rating</option>
              <option value="popularity">sort by popularity</option>
            </select>
          </div>

          <div className="row mb-5">
            {newList.map((product) => (
              <div
                key={product.id}
                className="col-md-6 col-xl-4 col-xxl-3 mb-4"
              >
                <div className="each-product">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                  />
                  <p
                    className="text-uppercase add-btn my-auto"
                    onClick={
                      cartItems.some((item) => item.id === product.id)
                        ? () => navigate("/cart")
                        : () => handleAddToCart(product.id)
                    }
                  >
                    {loading
                      ? "Adding item..."
                      : !cartItems.some((item) => item.id === product.id)
                      ? "Add To cart"
                      : "view Cart"}
                  </p>
                </div>
                <h5 className="fw-semibold mt-3">{product.name}</h5>

                <p className="fw-medium item-price">
                  ${product.price.toFixed(2)}{" "}
                  <span className="fw-semibold ms-1">
                    <AiFillStar className="mb-1 ratings" />
                    <AiFillStar className="mb-1 ratings" />
                    <AiFillStar className="mb-1 ratings" />
                    <AiFillStar className="mb-1 ratings" />
                    <MdStarHalf className="mb-1 ratings" />
                    <span className="mb-1 ms-1 ratings">{product.rating}</span>
                  </span>
                </p>
              </div>
            ))}
            <div className="pagin mx-auto w-100">
              <Pagination className="mx-auto">
                {items.map((page, index) => {
                  return (
                    <Pagination.Item
                      key={index}
                      active={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Pagination.Item>
                  );
                })}
              </Pagination>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
}
