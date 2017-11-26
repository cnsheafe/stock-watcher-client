const fetch = require("isomorphic-fetch");

export default function fetchCompanies(searchphrase: string): Promise<{}> {
  const url =
    process.env.NODE_ENV === "production"
      ? `https://stock-watcher-app.herokuapp.com/company/?searchphrase=${
          searchphrase
        }`
      : `http://localhost:5000/company/?searchphrase=${searchphrase}`;
  const options = {
    method: "GET"
  };

  return fetch(url, options)
    .then(res => {
      return res.json();
    })
    .then(json => {
      return json as any[];
    });
}
