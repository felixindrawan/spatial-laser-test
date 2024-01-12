export const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const decimalsFormat = (num: number, decimals = 2) =>
  (Math.round(num * 100) / 100).toFixed(decimals);
