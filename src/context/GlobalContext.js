import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import medicalProducts from "../components/main-cart/ProductList";

export const GlobalContext = createContext(null);

const GlobalStateProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [numOfItems, setNumOfItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
        console.log("dsfgsadg");
      } else {
        setCurrentUser(null);
      }
    });

    return () => unSub();
  }, []);
  const fetchCartItems = async () => {
    if (currentUser) {
      const docRef = doc(db, "userCart", currentUser);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCartItems(data?.cart);
      }
    }
  };
  const handleCost = () => {
    let value = cartItems?.reduce((total, eachItem) => {
      const product = medicalProducts.find((item) => item.id === eachItem.id);
      return total + (product ? eachItem.amount * product.price : 0);
    }, 0);

    setSubTotal(value);
    setGrandTotal(value + 0.15 * value);
  };

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        numOfItems,
        setNumOfItems,
        cartItems,
        setCartItems,
        subTotal,
        grandTotal,
        setGrandTotal,
        setSubTotal,
        fetchCartItems,
        handleCost,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvider;
