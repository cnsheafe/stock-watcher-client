import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import "react-hot-loader/patch";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SearchPage from "./components/SearchPage";
import TickerPage from "./components/TickerPage";
import store from "./store/store";
import Nav from "./components/Nav";

function renderApp() {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter basename='/'>
        <div>
          <Nav />
          <Route exact path="/" component={TickerPage} />
          <Route path="/graphs" component={SearchPage} />
        </div>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById("root") as HTMLElement
  );
}

renderApp();

if (module.hot) {
  module.hot.accept("./components/App", () => {
    renderApp();
  });
}
