import { PropTypes } from "prop-types";

import "./ProductDetails.css";

function Productdetails({ content, isInCart, addToCart, removeFromCart }) {
  const productId = content && content.id;
  const toggleCart = () => {
    if (isInCart) {
      removeFromCart(productId);
    } else {
      addToCart(productId);
    }
  };
  return (
    <>
      {!!content ? (
        <div className="content">
          <img
            src={content.image}
            alt={content.title}
            className="content__img"
          />
          <h2>{content.title}</h2>
          <p>{content.description}</p>
          <button type="button" className="addToCart" onClick={toggleCart}>
            {isInCart ? "Remove to Cart -" : "Add to Cart +"}
          </button>
          <br />
          <br />
          <hr />
          <div className="price">
            <small>Price:</small> {content.price}€
          </div>
        </div>
      ) : null}
    </>
  );
}

Productdetails.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Productdetails;
