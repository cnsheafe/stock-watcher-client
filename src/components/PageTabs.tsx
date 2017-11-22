import * as React from "react";
import { Link } from "react-router-dom";
import "../styles/page-tabs.scss";
export default class PageTabs extends React.Component {
  render() {
    return [
      <ul className="page-tabs">
        <li>
          <Link to="/">Tickers</Link>
        </li>
        <li>
          <Link to="/graphs">Graphs</Link>
        </li>
      </ul>
    ];
  }
}
