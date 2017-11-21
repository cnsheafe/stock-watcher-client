import * as React from "react";
import { Company } from "../store/schema";
import SearchResultCard from "./SearchResultCard";
import store from "../store/store";
import { IState } from "../store/store";
import { connect } from "react-redux";
import { TickerCard } from "./TickerCard";
import { addGraphAsync } from "../store/actions";
import { dispatchTickers } from "../actions/dispatchTickers";
export interface SearchProps {
  searchResults: Company[];
  onTickers: boolean;
}

export class SuggestionsList extends React.Component<SearchProps, {}> {
  render() {
    const mHandler = this.props.onTickers
      ? this.tickerHandler
      : this.graphHandler;

    const suggestions = this.props.searchResults.map((company, index) => (
      <li key={index.toString()} className="search-suggestions-item">
        <SearchResultCard company={company} suggestionHandler={mHandler} />
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
  tickerHandler(company: Company) {
    store.dispatch(dispatchTickers([company.symbol]));
  }
}

function mapStateToProps(state: IState): SearchProps {
  return {
    searchResults: state.searchResults,
    onTickers: state.onTickers
  };
}

export default connect(mapStateToProps)(SuggestionsList);
