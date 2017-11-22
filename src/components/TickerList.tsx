import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import store from "../store/store";
import { IState } from "../store/typings";
import { TickerCard } from "./TickerCard";

import Tickers, { Ticker } from "../actions/Tickers";
import "../styles/tickers.scss";
import PageTabs from "./PageTabs";

export interface TickerListProps {
  tickers: Set<Ticker>;
}
export class TickerList extends React.Component<TickerListProps, {}> {
  mTickers: Tickers;
  constructor(props) {
    super(props);
    this.mTickers = new Tickers();
  }
  render() {
    const listOfTickers = [...this.props.tickers].map((ticker, index) => (
      <li key={index.toString()}>
        <TickerCard price={ticker.price} symbol={ticker.symbol} index={index} />
      </li>
    ));
    return <ul className="ticker-list">{listOfTickers}</ul>;
  }
  componentDidMount() {
    const initSymbols = ["msft", "amd", "nflx"];
    const validSymbols = new Set<string>();
    const existingTickers = new Set<Ticker>([...this.props.tickers]);

    if (existingTickers.size === 0) {
      store.dispatch(this.mTickers.AddMany(initSymbols));
    }
  }
}

function mapStateToProps(state: IState): TickerListProps {
  return {
    tickers: state.tickers
  };
}
export default withRouter(connect(mapStateToProps)(TickerList));
