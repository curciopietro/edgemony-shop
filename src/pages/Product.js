import { useState, useEffect } from "react";
import { fetchProduct } from "./../services/api";
import { useParams } from "react-router-dom";

function Product({ addToCart, removeFromCart, isInCart }) {
  let { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(productId).then((product) => {
      setProduct(product);
    });
  }, [productId]);

  const toggleCart = () => {
    if (isInCart(product)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return product ? (
    <div className="content">
      <img src={product.image} alt={product.title} className="content__img" />
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
  ) : (
    <div>Loading product...</div>
  );
}
export default Product;
