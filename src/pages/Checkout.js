import { useState } from "react";
import "./Checkout.css";
import { updateCart, createOrder, createNewCart } from "./../services/api";

let billingData;

export default function Checkout({ cartId }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    billingData = formData;
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      email: "",
    });

    updateCart(cartId, billingData);
    createOrder(cartId);
    createNewCart();
  };

  return (
    <div className="checkout">
      <form className="checkout__form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">Name</label>
        <input
          type="text"
          id="firstName"
          required
          value={formData.firstName}
          name="firstName"
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="lastName"
          required
          value={formData.lastName}
          name="lastName"
          onChange={handleChange}
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          required
          value={formData.address}
          name="address"
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          name="email"
          onChange={handleChange}
        />

        <button type="submit">Procede to payment</button>
      </form>
    </div>
  );
}
