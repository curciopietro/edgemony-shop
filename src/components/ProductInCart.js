import "./ProductInCart.css";

export default function ProductInCart({ product }) {
  return (
    <article className="single-product">
      <div className="single-product__image-container">
        <img src={product.image} alt="product" />
      </div>
      <div className="single-product__description">
        <h2>{product.title}</h2>
        <span className="single-product__quantity">
          Qty. <button>+</button> 99 <button>-</button>
        </span>
        <span className="single-product__price">Price: €{product.price}</span>
        <button type="button">Remove</button>
      </div>
    </article>
  );
}
