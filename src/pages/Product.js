import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "./../services/api";
import Loader from "./../components/Loader";
import ErrorBanner from "./../components/ErrorBanner";

function Product({ addToCart, removeFromCart, isInCart }) {
  let { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setApiError("");
    fetchProduct(productId)
      .then((product) => {
        setProduct(product);
      })
      .catch((err) => {
        setApiError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [productId, retry]);

  const toggleCart = () => {
    if (isInCart(product)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : apiError ? (
        <ErrorBanner
          message={apiError}
          retry={setRetry(!retry)}
          close={setApiError("")}
        />
      ) : (
        <div className="content">
          <img
            src={product.image}
            alt={product.title}
            className="content__img"
          />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <button type="button" className="addToCart" onClick={toggleCart}>
            {isInCart(product.id) ? "Remove to Cart -" : "Add to Cart +"}
          </button>
          <br />
          <br />
          <hr />
          <div className="price">
            <small>Price:</small> {product.price}€
          </div>
        </div>
      )}
    </>
  );
}
export default Product;
