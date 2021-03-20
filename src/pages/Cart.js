import "../components/Cart.css";
import ProductInCart from "../components/ProductInCart";
import formatPrice from "../services/utils";

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
      {products.length > 0 && <div>Go to checkout</div>}
    </div>
  );
}

export default Cart;
