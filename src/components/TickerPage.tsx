import * as React from "react";
import TickerList from "./TickerList";
import Search from "./Search";
import SuggestionsList from "./SuggestionsList";

export default class extends React.Component {
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
