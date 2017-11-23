import * as React from "react";
import { Link } from "react-router-dom";
import TabSwitch from "../actions/TabSwitch";
import store from "../store/store";

import "../styles/page-tabs.scss";
export default class PageTabs extends React.Component {
  tabSwitch: TabSwitch;
  constructor() {
    super(null);
    this.tabSwitch = new TabSwitch();
  }
  render() {
    return [
      <ul className="page-tabs">
        <li>
          <Link to="/" onClick={e => this.switchHandler(true)}>
            Tickers
          </Link>
        </li>
        <li>
          <Link to="/graphs" onClick={e => this.switchHandler(false)}>
            Graphs
          </Link>
        </li>
      </ul>
    ];
  }

  switchHandler(toTicker: boolean) {
    console.log("switch!");
    store.dispatch(this.tabSwitch.switchPage(toTicker));
  }
}
