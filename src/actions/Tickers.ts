import { ActionCreator, Dispatch } from "redux";
import { IState } from "../store/store";
import { fetchPrices } from "../services/fetchPrices";
export const ADD_TICKERS = "ADD_TICKERS";
export const REMOVE_TICKER = "REMOVE_TICKER";

export type Ticker = {
  symbol: string;
  price: number;
};

export interface AddTickers {
  type: "ADD_TICKERS";
  tickers: Ticker[];
}

export interface RemoveTicker {
  type: "REMOVE_TICKER";
  tickerIndex: number;
}

export default class Tickers {
  AddMany(symbols: string[]) {
    return function(dispatch: Dispatch<IState>) {
      fetchPrices(symbols).then(results => {
        console.log(results);
        const tickers = symbols.map(symbol => {
          return {
            symbol: symbol.toLowerCase(),
            price: results[symbol][0].price
          };
        });
        dispatch<AddTickers>({
          type: ADD_TICKERS,
          tickers: tickers
        });
      });
    };
  }

  RemoveOne(index: number) {
    return function(dispatch: Dispatch<IState>) {
      dispatch<RemoveTicker>({
        type: REMOVE_TICKER,
        tickerIndex: index
      });
    };
  }
}
