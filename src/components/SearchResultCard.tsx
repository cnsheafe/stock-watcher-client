import * as React from "react";
import { Company } from "../store/schema";
import store from "../store/store";
import "../styles/suggestion-card.scss";
import TickerAction, { Ticker } from "../action-creators/TickerAction";
import SearchSuggestions from "../action-creators/SearchSuggestions";
import GraphAction from "../action-creators/GraphAction";

interface ResultCardProps {
  tickers: Set<Ticker>;
  company: Company;
  onTickers: boolean;
}

/**
 * Represents a single search result
 */
export default class SearchResultCard extends React.Component<
  ResultCardProps,
  {}
> {
  tickerAction: TickerAction;
  graphAction: GraphAction;
  searchAction: SearchSuggestions;

  constructor(props) {
    super(props);
    this.tickerAction = new TickerAction();
    this.graphAction = new GraphAction();
    this.searchAction = new SearchSuggestions();
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

  /**
   * Add graph
   * @param company
   */
  protected graphHandler(company: Company) {
    store.dispatch(this.graphAction.addGraph(company));
  }

  /**
   * Adds tickers
   * @param company
   * @param inUseTickers
   */
  protected tickerHandler(company: Company, inUseTickers: Set<Ticker>) {
    for (let ticker of inUseTickers) {
      if (ticker.symbol === company.symbol.toLowerCase()) {
        return;
      }
    }
    store.dispatch(this.tickerAction.RequestMany([company.symbol]));
    store.dispatch(this.searchAction.clearSuggestions());
  }
}
