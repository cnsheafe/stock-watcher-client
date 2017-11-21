import { ActionCreator, Dispatch } from "redux";
import { IState } from "../store/store";
import { fetchPrices } from "../services/fetchPrices";
export const ADD_TICKERS = "ADD_TICKERS";

export type Ticker = {
  symbol: string;
  price: number;
};

export interface AddTickers {
  type: "ADD_TICKERS";
  tickers: Ticker[];
}

export function dispatchTickers(symbols: string[]) {
  return function(dispatch: Dispatch<IState>) {
    fetchPrices(symbols).then(results => {
      console.log(results);
      const tickers = symbols.map(symbol => {
        return {
          symbol: symbol,
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
