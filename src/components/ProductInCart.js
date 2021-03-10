import "./ProductInCart.css";
import formatPrice from "../services/utils";

export default function ProductInCart({
  product,
  setProductQuantity,
  removeFromCart,
}) {
  const { image, title, price, quantity, id } = product;
  const increment = () => setProductQuantity(id, quantity + 1);
  const decrement = () => setProductQuantity(id, quantity - 1);
  const remove = () => removeFromCart(id);

  return (
    <article className="single-product">
      <div className="single-product__image-container">
        <img src={image} alt="product" />
      </div>
      <div className="single-product__description">
        <h2>{title}</h2>
        <span className="single-product__quantity">
          Qty.
          <button onClick={increment}>+</button>
          <span>{quantity}</span>
          <button onClick={decrement} disabled={quantity === 1}>
            -
          </button>
        </span>
        <span className="single-product__price">
          Price: {formatPrice(price)}
        </span>
        <button type="button" onClick={remove}>
          Remove
        </button>
      </div>
    </article>
  );
}
