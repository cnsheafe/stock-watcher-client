StockWatcher App
=

View stock prices from different companies and set SMS Alerts when stocks reach a certain price.
![Graph of Microsoft Stock](/readme-assets/stockwatcher-graph.png)

About
-

This repository contains the frontend of StockWatcher. For the repository of the backend go [here](https://github.com/cnsheafe/StockWatcher).

User Features
-

* NASDAQ stock symbol lookup
* Stock Tickers
* Graphs generated from company stock price history
* Custom SMS Alerts

Technical Features
-

* React Router for navigation and history
* Fetch API for network requests
* Typescript-Babel for transpiled ES6

Tech Stack
-

* React
* Redux
* Typescript
* RxJs
* Chart.js
* Fetch API
* Material Icons
* Sass/SCSS

Development Tools
-

* Webpack
* Awesome Typescript Loader
* Babel
* SCSS
* Jest
* Enzyme
* TravisCI

Architecture
-

The client app is built on a React-Redux architecture reliant on all business
calls from a separate RESTful backend. The app is composed of action creators,
components, and the store. The action creators and components are classes
with distinct responsibilities along the lines of SOLID.

The client is developed with a custom Webpack configuration that allows for
injecting styles, transpiling typescript, and offering different rules depending
on the development or production.

The client is deployed via a thin Node.js server mounted on a Heroku container.

Instructions for development
-

Run a copy of the [backend](https://github.com/cnsheafe/StockWatcher) to get
real data for the API calls. Or change the base urls in 'network-calls' to
https://stock-watcher-app.herokuapp.com .

```bash
npm install
npm start
```