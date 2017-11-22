import * as React from "react";
import Tickers from "../actions/Tickers";
import store from "../store/store";
import '../styles/tickers.scss';

interface TickerProps {
  symbol: string;
  price: number;
  index: number;
}
export class TickerCard extends React.Component<TickerProps> {
  mTickers: Tickers;
  timerId;
  constructor(props) {
    super(props);
    this.mTickers = new Tickers();
  }
  render() {
    return (
      <div className="ticker-card">
        <span>{this.props.symbol.toUpperCase()}</span>
        <span>{this.props.price} USD</span>
        <i onClick={e => this.removeTicker(this.props.index)} className="material-icons">
        cancel
        </i>
      </div>
    );
  }
  removeTicker(index: number) {
    console.log("MyIndex: ",index);
    store.dispatch(this.mTickers.RemoveOne(index));
  }
  componentDidMount() {
    this.timerId = setInterval(() => {
      console.log("Update!");
      store.dispatch(this.mTickers.UpdateOne(this.props.index, this.props.symbol));
    }, 1e3 * 60);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
}
