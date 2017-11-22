import * as React from "react";
import { Company } from "../store/schema";
import store from "../store/store";
import "../styles/suggestion-card.scss";
import Tickers, { Ticker } from "../actions/Tickers";
import SearchSuggestions from "../actions/SearchSuggestions";
import Graphs from '../actions/Graphs';

interface ResultCardProps {
  tickers: Set<Ticker>;
  company: Company;
  onTickers: boolean;
}
export default class SearchResultCard extends React.Component<
  ResultCardProps,
  {}
> {
  constructor(props) {
    super(props);
  }
  render() {
    const company = this.props.company;
    const cardElm = this.props.onTickers ? (
      <div
        onClick={e => this.tickerHandler(company, this.props.tickers)}
        className="suggestion-card"
      >
        <i className="material-icons purple700">add_circle</i>
        <p>
          {company.symbol}: {company.name}
        </p>
      </div>
    ) : (
      <div
        onClick={e => this.graphHandler(company)}
        className="suggestion-card"
      >
        <i className="material-icons purple700">add_circle</i>
        <p>
          {company.symbol}: {company.name}
        </p>
      </div>
    );
    return cardElm;
  }
  graphHandler(company: Company) {
    console.log("Hello");
    store.dispatch(new Graphs().addGraph(company));
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
