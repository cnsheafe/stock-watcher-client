const fetch = require("isomorphic-fetch");

export function fetchPrices(symbols: string[]) {
  const url = "http://localhost:5000/stockprice";
  const params = {
    symbols: symbols
  };
  const requestOptions = {
    method: 'POST',
    cache: "default",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      symbols: symbols
    })
  };
  return fetch(url, requestOptions)
  .then(res => res.json());
}
