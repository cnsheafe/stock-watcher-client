import * as React from "react";
import { NavLink } from "react-router-dom";
import TabSwitch from "../action-creators/TabSwitch";
import store from "../store/store";

import "../styles/page-tabs.scss";

/**
 * Represents a nav for switching between the pages
 */
export default class Nav extends React.Component {
  tabSwitch: TabSwitch;
  constructor(props) {
    super(props);
    this.tabSwitch = new TabSwitch();
  }

  render() {
    return (
      <ul className="page-tabs">
        <li className="ticker-link">
          <NavLink
            exact to="/"
            onClick={e => this.switchHandler(true)}
            activeClassName="on-page"
          >
            Tickers
          </NavLink>
        </li>
        <li className="graph-link">
          <NavLink
            exact to="/graphs"
            onClick={e => this.switchHandler(false)}
            activeClassName="on-page"
          >
            Graphs
          </NavLink>
        </li>
      </ul>
    );
  }

  // Switches pages
  switchHandler(toTicker: boolean) {
    store.dispatch(this.tabSwitch.switchPage(toTicker));
  }
}
