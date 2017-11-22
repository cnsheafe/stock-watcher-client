import * as React from "react";
import { connect } from "react-redux";
import store from "../store/store";
import { IState } from "../store/typings";
import { TickerCard } from "./TickerCard";

import Tickers, {Ticker} from '../actions/Tickers';
import "../styles/tickers.scss";

export interface TickerListProps {
  tickers: Ticker[];
}
export class TickerList extends React.Component<TickerListProps, {}> {
  mTickers: Tickers;
  constructor(props) {
    super({tickers: props.tickers});
    this.mTickers = new Tickers();
  }
  render() {
    const listOfTickers = this.props.tickers.map((ticker, index) => (
      <li key={index.toString()}>
        <TickerCard price={ticker.price} symbol={ticker.symbol} index={index}/>
      </li>
    ));
    return <ul className="ticker-list">{listOfTickers}</ul>;
  }
  componentDidMount() {
    store.dispatch(this.mTickers.AddMany(["msft", "amd", "nflx"]));
  }
}

function mapStateToProps(state: IState): TickerListProps {
  return {
    tickers: state.tickers
  };
}
export default connect(mapStateToProps)(TickerList);
