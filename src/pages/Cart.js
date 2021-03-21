import "../components/Cart.css";
import ProductInCart from "../components/ProductInCart";
import formatPrice from "../services/utils";
import { Link } from "react-router-dom";

function Cart({ products, totalPrice, setProductQuantity, removeFromCart }) {
  return (
    <div className="cart">
      <article className="cart__main">
        {products.length > 0
          ? products.map((product) => {
              return (
                <ProductInCart
                  key={product.id}
                  product={product}
                  setProductQuantity={setProductQuantity}
                  removeFromCart={removeFromCart}
                />
              );
            })
          : "The cart is empty"}
      </article>
      <footer className="cart__footer">
        <div>Total: {formatPrice(totalPrice)}</div>
      </footer>
      {products.length > 0 && (
        <Link to="/cart/checkout">
          <button>Go to checkout</button>
        </Link>
      )}
    </div>
  );
}

export default Cart;
