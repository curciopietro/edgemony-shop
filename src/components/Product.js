import { PropTypes } from "prop-types";

import { Link } from "react-router-dom";
import "./Product.css";

function Product({ product }) {
  return (
    <article className="Product">
      <img src={product.image} alt={product.title} />
      <div className="content">
        <h1>{product.title}</h1>
        <p>Price: {product.price}€</p>
      </div>
      <Link to={`/product/${product.id}`}>View details</Link>
    </article>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
