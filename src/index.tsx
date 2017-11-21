import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import "react-hot-loader/patch";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, StaticRouter } from "react-router-dom";

import App from "./components/App";
import { Body } from "./components/Body";
import TickerPage from "./components/TickerPage";
import store from "./store/store";

function renderApp() {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter basename='/'>
        <div>
          <Route exact path="/" component={TickerPage} />
          <Route path="/view" component={Body} />
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
