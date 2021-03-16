import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import ProductList from "./components/ProductList";
import ErrorBanner from "./components/ErrorBanner";
import { fetchProducts, fetchCatogories } from "./services/api";
import Cart from "./components/Cart";
import ModalSideBar from "./components/ModalSideBar";
import Modal from "./components/Modal";
import ProductDetails from "./components/ProductDetails";

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
  const [productInModal, setProductInModal] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openProductModal(product) {
    setProductInModal(product);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setTimeout(() => {
      setProductInModal(null);
    }, 500);
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.height = `100vh`;
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.height = ``;
      document.body.style.overflow = ``;
    }
  }, [modalIsOpen]);

  // API data logic
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setApiError("");
    Promise.all([fetchProducts(), fetchCatogories()])
      .then(([products, categories]) => {
        setProducts(products);
        setCategories(categories);
      })
      .catch((err) => setApiError(err.message))
      .finally(() => setIsLoading(false));
  }, [retry]);

  // Cart Logic
  const [cart, setCart] = useState([]);
  const [modalSidebar, setModalSideBar] = useState(false);

  const cartProducts = cart.map((cartItem) => {
    const { price, image, title, id } = products.find(
      (p) => p.id === cartItem.id
    );
    return { price, image, title, id, quantity: cartItem.quantity };
  });

  const cartTotal = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const cartSize = cart.length;
  const isProductModalInCart =
    productInModal !== null &&
    cart.find((p) => p.id === productInModal.id) != null;

  function openSideBar() {
    setModalSideBar(!modalSidebar);
  }

  function addToCart(productId) {
    setCart([...cart, { id: productId, quantity: 1 }]);
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
    <div className="App">
      <Header
        logo={data.logo}
        title={data.title}
        cartTotal={cartTotal}
        cartSize={cartSize}
        openSideBar={openSideBar}
      />
      <Hero
        title={data.title}
        description={data.description}
        cover={data.cover}
      />
      <main>
        <ModalSideBar
          modalSidebar={modalSidebar}
          openSideBar={openSideBar}
          title="Cart"
        >
          <Cart
            products={cartProducts}
            totalPrice={cartTotal}
            setProductQuantity={setProductQuantity}
            removeFromCart={removeFromCart}
          />
        </ModalSideBar>

        <Modal isOpen={modalIsOpen} closeModal={closeModal}>
          <ProductDetails
            content={productInModal}
            isInCart={isProductModalInCart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </Modal>

        {isLoading ? (
          <Loader />
        ) : apiError ? (
          <ErrorBanner
            message={apiError}
            close={() => setApiError("")}
            retry={() => setRetry(!retry)}
          />
        ) : (
          <ProductList
            products={products}
            categories={categories}
            openProductModal={openProductModal}
          />
        )}
      </main>
    </div>
  );
}

export default App;
