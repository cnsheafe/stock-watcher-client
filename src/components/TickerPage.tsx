import * as React from "react";
import TickerList from "./TickerList";
import Search from "./Search";
import SuggestionsList from "./SuggestionsList";

/**
 * Represents a page for Tickers
 */
export default class TickerPage extends React.Component {
  render() {
    return (
      <section>
        <Search />
        <SuggestionsList />
        <TickerList />
      </section>
    );
  }
}
