import * as React from "react";
import TickerList from "./TickerList";
import { TickerSearch } from "./TickerSearch";
export default class extends React.Component {
  render() {
    return [<TickerSearch />, <TickerList />];
  }
}
