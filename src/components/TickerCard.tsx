import * as React from "react";
import Tickers from "../actions/Tickers";
import store from "../store/store";
import "../styles/tickers.scss";

interface TickerProps {
  symbol: string;
  price: number;
}
export class TickerCard extends React.Component<TickerProps> {
  timerId;
  mTickers: Tickers;

    constructor(props: TickerProps) {
      super(props);
      this.mTickers = new Tickers();
    }
  render() {

    const priceElm =
      this.props.price === 0 ? (
        <span className="loading-anim">
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </span>
      ) : (
        <span>{this.props.price} USD</span>
      );
    return (
      <div className="ticker-card">
        <span>{this.props.symbol.toUpperCase()}</span>
        {priceElm}
        <i
          onClick={e => this.removeTicker(this.props.symbol)}
          className="material-icons red700"
        >
          cancel
        </i>
      </div>
    );
  }
  removeTicker(symbol: string) {
    store.dispatch(this.mTickers.RemoveOne(symbol));
  }

  componentDidMount() {
    console.log(this.props.symbol);
    this.updateHandler(this.props.symbol);
    this.timerId = setInterval(() => {
      store.dispatch(
        new Tickers().UpdateOne(this.props.symbol)
      );
    }, 1e3 * 60);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  updateHandler(symbol: string) {
    store.dispatch(
      new Tickers().UpdateOne(symbol)
    ).then(action => {
      if(!action.updatedTicker) {
        this.updateHandler(symbol);
      }
    });
  }
}
