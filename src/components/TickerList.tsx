import * as React from "react";
import { connect } from "react-redux";
import store from "../store/store";
import { IState } from "../store/typings";
// import { Ticker, AddTickers, fetchPrices} from "../actions/fetchPrices";
import {Ticker, dispatchTickers} from '../actions/dispatchTickers';
import {TickerCard} from './TickerCard';

import '../styles/tickers.scss';

export interface TickerListProps {
  tickers: Ticker[];
}
export class TickerList extends React.Component<TickerListProps, {}> {
  render() {
    const listOfTickers = this.props.tickers.map((ticker, index) => 
    <li key={index.toString()}>
      <TickerCard price={ticker.price} symbol={ticker.symbol}/>
    </li>);
    return <ul className="ticker-list">{listOfTickers}</ul>;
  }
  componentDidMount() {
    store.dispatch(dispatchTickers(["msft", "amd", "nflx"]));
  }
}

function mapStateToProps(state: IState): TickerListProps {
  return {
    tickers: state.tickers
  };
}
export default connect(mapStateToProps)(TickerList);
