import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import ProductList from "./components/ProductList";
import ProductModal from "./components/ProductModal";
import ErrorBanner from "./components/ErrorBanner";
import { fetchProducts, fetchCatogories } from "./services/api";
import CartModal from "./components/CartModal";

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
  const [cartModalOpen, setCartModalOpen] = useState(false);

  function openCartModal() {
    setCartModalOpen(!cartModalOpen);
  }

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

  return (
    <div className="App">
      <Header
        logo={data.logo}
        title={data.title}
        cart={cart}
        products={products}
        openCartModal={openCartModal}
      />
      <Hero
        title={data.title}
        description={data.description}
        cover={data.cover}
      />
      <CartModal
        cartModalOpen={cartModalOpen}
        openCartModal={openCartModal}
        cart={cart}
        products={products}
      />
      <main>
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
      <ProductModal
        isOpen={modalIsOpen}
        content={productInModal}
        closeModal={closeModal}
        cart={cart}
        setCart={setCart}
      />
    </div>
  );
}

export default App;
