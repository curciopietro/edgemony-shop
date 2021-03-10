const formatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

export default function formatPrice(price) {
  return formatter.format(price);
}
