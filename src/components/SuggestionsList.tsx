import * as React from "react";
import { Company } from "../store/schema";
import SearchResultCard from "./SearchResultCard";
import store from "../store/store";
import { IState } from "../store/store";
import { connect } from "react-redux";
import { TickerCard } from "./TickerCard";
import { Ticker } from "../action-creators/TickerAction";
import "../styles/suggestions-list.scss";

export interface SearchProps {
  searchResults: Company[];
  onTickers: boolean;
  tickers: Set<Ticker>;
}

/**
 * Represents a list of search suggestions
 */
export class SuggestionsList extends React.Component<SearchProps, {}> {
  render() {
    const suggestions = this.props.searchResults.map((company, index) => (
      <li key={index.toString()}>
        <SearchResultCard
          company={company}
          tickers={this.props.tickers}
          onTickers={this.props.onTickers}
        />
      </li>
    ));
    return (
      <ul
        id="search-suggestions"
        className={
          this.props.searchResults.length > 0
            ? "search-suggestions-list"
            : "hide"
        }
      >
        {suggestions}
      </ul>
    );
  }
}

function mapStateToProps(state: IState): SearchProps {
  return {
    searchResults: state.searchResults,
    onTickers: state.onTickers,
    tickers: state.tickers
  };
}

export default connect(mapStateToProps)(SuggestionsList);
