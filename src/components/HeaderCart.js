import PropTypes from "prop-types";
import formatPrice from "../services/utils";
import { Link } from "react-router-dom";

import "./HeaderCart.css";

function HeaderCart({ cartTotal, cartSize }) {
  return (
    <div className="HeaderCart">
      {!!cartSize && <span className="price">{formatPrice(cartTotal)}</span>}
      <span className="icon">
        <Link to={`/cart`}>
          <i className="fas fa-shopping-cart"></i>
        </Link>
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
