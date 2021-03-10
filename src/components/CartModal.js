import "./CartModal.css";
import ProductInCart from "./ProductInCart.js";

export default function CartModal({
  cartModalOpen,
  openCartModal,
  cart,
  products,
}) {
  return (
    <section className={cartModalOpen ? "cart-modal" : "cart-modal is-open"}>
      <header className="cart-modal__header">
        <i
          className="fas fa-times cart-modal-close"
          onClick={openCartModal}
        ></i>
        <div className="cart-modal__title">Cart</div>
      </header>
      <article className="cart-modal__main">
        {cart.map((product) => {
          return (
            <ProductInCart
              key={product.id}
              product={products.find((p) => product.id === p.id)}
            />
          );
        })}
      </article>
      <footer className="cart-modal__footer">
        <div>
          Total: $
          {cart
            .reduce((acc, cartItem) => {
              const product = products.find(
                (product) => product.id === cartItem.id
              );
              return acc + product.price;
            }, 0)
            .toFixed(2)}
        </div>
      </footer>
    </section>
  );
}
