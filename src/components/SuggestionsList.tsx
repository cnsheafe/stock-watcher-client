import * as React from "react";
import { Company } from "../store/schema";
import SearchResultCard from "./SearchResultCard";
import store from "../store/store";
import { IState } from "../store/store";
import { connect } from "react-redux";
import { TickerCard } from "./TickerCard";
import { addGraphAsync } from "../store/actions";
import Tickers, { Ticker } from "../actions/Tickers";
import SearchSuggestions from '../actions/SearchSuggestions';
import "../styles/suggestions-list.scss";

export interface SearchProps {
  searchResults: Company[];
  onTickers: boolean;
  tickers: Set<Ticker>;
}

export class SuggestionsList extends React.Component<SearchProps, {}> {
  render() {
    const mHandler = this.props.onTickers
      ? this.tickerHandler
      : this.graphHandler;

    const suggestions = this.props.searchResults.map((company, index) => (
      <li key={index.toString()}>
        <SearchResultCard
          company={company}
          suggestionHandler={mHandler}
          tickers={this.props.tickers}
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
  graphHandler(company: Company) {
    store.dispatch(addGraphAsync(company));
  }
  tickerHandler(company: Company, inUseTickers: Set<Ticker>) {
    for (let ticker of inUseTickers) {
      if (ticker.symbol === company.symbol.toLowerCase()) {
        return;
      }
    }
    store.dispatch(new Tickers().RequestMany([company.symbol]));
    store.dispatch(new SearchSuggestions().clearSuggestions());
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
