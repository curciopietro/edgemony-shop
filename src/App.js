import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Page404 from "./pages/Page404";

const data = {
  title: "Edgemony Shop",
  description: "A fake e-commerce with a lot of potential",
  logo:
    "https://edgemony.com/wp-content/uploads/2020/03/cropped-Logo-edgemony_TeBIANCO-04.png",
  cover:
    "https://images.pexels.com/photos/4123897/pexels-photo-4123897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
};

function App() {
  // Modal logic

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [productInModal, setProductInModal] = useState(null);

  // function openProductModal(product) {
  //   setProductInModal(product);
  //   setModalIsOpen(true);
  // }

  // function closeModal() {
  //   setModalIsOpen(false);
  //   setTimeout(() => {
  //     setProductInModal(null);
  //   }, 500);
  // }

  // useEffect(() => {
  //   if (modalIsOpen) {
  //     document.body.style.height = `100vh`;
  //     document.body.style.overflow = `hidden`;
  //   } else {
  //     document.body.style.height = ``;
  //     document.body.style.overflow = ``;
  //   }
  // }, [modalIsOpen]);

  // Cart Logic
  const [cart, setCart] = useState([]);

  const cartTotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const cartSize = cart.length;

  function isInCart(product) {
    return product != null && cart.find((p) => p.id === product.id) != null;
  }

  function addToCart(product) {
    setCart([...cart, { ...product, quantity: 1 }]);
  }

  function removeFromCart(productId) {
    setCart(cart.filter((p) => p.id !== productId));
  }

  function setProductQuantity(productId, quantity) {
    setCart(
      cart.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  }

  return (
    <Router>
      <div className="App">
        <Header
          logo={data.logo}
          title={data.title}
          cartTotal={cartTotal}
          cartSize={cartSize}
        />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cart">
            <Cart
              products={cart}
              totalPrice={cartTotal}
              setProductQuantity={setProductQuantity}
              removeFromCart={removeFromCart}
            />
          </Route>
          <Route path="/product/:productId">
            <Product
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              isInCart={isInCart}
            />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
