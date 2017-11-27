import * as React from "react";
import TickerAction from "../action-creators/TickerAction";
import store from "../store/store";
import "../styles/tickers.scss";


interface TickerProps {
  symbol: string;
  price: number;
}

/**
 * Represents a single ticker
 */
export class TickerCard extends React.Component<TickerProps> {
  timerId;
  mTickers: TickerAction;

  constructor(props: TickerProps) {
    super(props);
    this.mTickers = new TickerAction();
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
        <span>{priceElm}</span>
        <span className="ticker-delete">
          <span>DEL</span>
          <i
            onClick={e => this.removeTicker(this.props.symbol)}
            className="material-icons red700"
          >
            cancel
          </i>
        </span>
      </div>
    );
  }

  componentDidMount() {
    this.updateHandler(this.props.symbol);
    this.timerId = setInterval(() => {
      store.dispatch(new TickerAction().UpdateOne(this.props.symbol));
    }, 1e3 * 60);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  protected updateHandler(symbol: string) {
    store.dispatch(new TickerAction().UpdateOne(symbol)).then(action => {
      if (!action.updatedTicker.price) {
        this.updateHandler(symbol);
      }
    });
  }

  protected removeTicker(symbol: string) {
    store.dispatch(this.mTickers.RemoveOne(symbol));
  }
}
