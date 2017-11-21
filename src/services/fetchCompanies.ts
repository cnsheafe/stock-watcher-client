const fetch = require("isomorphic-fetch");

export default function fetchCompanies(searchphrase: string): Promise<JSON> {
  const url = `http://localhost:5000/company/?searchphrase=${searchphrase}`;
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
