export default function postWatch(symbol: string, phoneNumber: string, targetPrice: number) {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://stock-watcher-app.herokuapp.com/watch"
      : "http://localhost:5000/watch";

  const bodyBlob = new Blob([
    JSON.stringify({
      symbol: symbol,
      phone: phoneNumber,
      price: targetPrice
    })
  ]);

  const options = {
    method: "POST",
    body: bodyBlob,
    headers: new Headers({"Content-Type": "application/json"})  

  };
  const watchRequest = new Request(url, options);

  return fetch(watchRequest)
    .then(res => {
      return res.status;
    });
}
