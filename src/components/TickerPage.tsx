import * as React from "react";
import TickerList from "./TickerList";
import Search from "./Search";
import SuggestionsList from "./SuggestionsList";
import PageTabs from './PageTabs';

export default class extends React.Component {
  render() {
    return [<PageTabs /> ,<Search />, <SuggestionsList />, <TickerList />];
  }
}
