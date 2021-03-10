import "./CartModal.css";
import ProductInCart from "./ProductInCart.js";
import formatPrice from "../services/utils";

export default function CartModal({
  cartModalOpen,
  openCartModal,
  products,
  totalPrice,
  setProductQuantity,
  removeFromCart,
}) {
  return (
    <section
      className={cartModalOpen ? "cart-modal" : "cart-modal slide-to-left"}
    >
      <header className="cart-modal__header">
        <i
          className="fas fa-times cart-modal-close"
          onClick={openCartModal}
        ></i>
        <div className="cart-modal__title">Cart</div>
      </header>
      <article className="cart-modal__main">
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
      <footer className="cart-modal__footer">
        <div>Total: {formatPrice(totalPrice)}</div>
      </footer>
    </section>
  );
}
