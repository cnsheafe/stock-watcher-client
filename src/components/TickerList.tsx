import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import store from "../store/store";
import { IState } from "../store/store";
import { TickerCard } from "./TickerCard";

import TickerAction, { Ticker } from "../action-creators/TickerAction";
import "../styles/tickers.scss";

export interface TickerListProps {
  tickers: Set<Ticker>;
}

/**
 * Represents a list of tickers
 */
export class TickerList extends React.Component<TickerListProps, {}> {
  mTickers: TickerAction;
  constructor(props) {
    super(props);
    this.mTickers = new TickerAction();
  }
  render() {
    const listOfTickers = [...this.props.tickers].map((ticker, index) => (
      <li key={index}>
        <TickerCard price={ticker.price} symbol={ticker.symbol} />
      </li>
    ));
    return (
      <div>
        <div className="ticker-list-header" key={"t-header"}>
          Tickers by the Minute
        </div>
        <ul className="ticker-list" key={"t-list"}>
          {listOfTickers}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    const initSymbols = ["msft", "amd", "nflx"];
    const validSymbols = new Set<string>();
    const existingTickers = new Set<Ticker>([...this.props.tickers]);

    if (existingTickers.size === 0) {
      store.dispatch(this.mTickers.RequestMany(initSymbols));
    }
  }
}

function mapStateToProps(state: IState): TickerListProps {
  return {
    tickers: state.tickers
  };
}
export default withRouter(connect(mapStateToProps)(TickerList));
