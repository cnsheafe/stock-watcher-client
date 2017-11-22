import * as React from "react";
import {Link} from 'react-router-dom';
export default class PageTabs extends React.Component {
  render() {
    return [
      <Link to="/">Tickers</Link>,
      <Link to="/graphs">Graphs</Link>
    ];
  }
}
