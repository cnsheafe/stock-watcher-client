import * as React from "react";
// import {dispatchTickers} from '../actions/dispatchTickers';
import Tickers from "../actions/Tickers";

import store from "../store/store";
interface TickerProps {
  symbol: string;
  price: number;
  index: number;
}
export class TickerCard extends React.Component<TickerProps> {
  mTickers: Tickers;
  constructor(props) {
    super(props);
    this.mTickers = new Tickers();
  }
  render() {
    return (
      <div className="ticker-card">
        <span>{this.props.symbol}</span>
        <span>{this.props.price}</span>
        <button onClick={e => this.removeTicker(this.props.index)}>
          Remove
        </button>
      </div>
    );
  }
  removeTicker(index: number) {
    console.log("MyIndex: ",index);
    store.dispatch(this.mTickers.RemoveOne(index));
  }
}
