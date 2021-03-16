import PropTypes from "prop-types";
import formatPrice from "../services/utils";

import "./HeaderCart.css";

function HeaderCart({ cartTotal, cartSize, openSideBar }) {
  return (
    <div className="HeaderCart">
      {!!cartSize && <span className="price">{formatPrice(cartTotal)}</span>}
      <span className="icon">
        <i className="fas fa-shopping-cart" onClick={openSideBar}></i>
        {!!cartSize && <span className="qty">{cartSize}</span>}
      </span>
    </div>
  );
}

HeaderCart.propTypes = {
  cartTotal: PropTypes.number.isRequired,
  cartSize: PropTypes.number.isRequired,
};

export default HeaderCart;
