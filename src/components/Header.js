import PropTypes from "prop-types";

import HeaderCart from "./HeaderCart";
import "./Header.css";

function Header({ logo, title, cartTotal, cartSize, openCartModal }) {
  return (
    <header className="Header">
      <img src={logo} alt={title} />
      <HeaderCart
        cartTotal={cartTotal}
        cartSize={cartSize}
        openCartModal={openCartModal}
      />
    </header>
  );
}

Header.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cartTotal: PropTypes.number.isRequired,
  cartSize: PropTypes.number.isRequired,
};

export default Header;
