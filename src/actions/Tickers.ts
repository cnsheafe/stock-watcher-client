import { ActionCreator, Dispatch } from "redux";
import { IState } from "../store/store";
import { fetchPrices } from "../services/fetchPrices";
export const ADD_TICKERS = "ADD_TICKERS";
export const REMOVE_TICKER = "REMOVE_TICKER";
export const UPDATE_TICKER = "UPDATE_TICKER";

export type Ticker = {
  symbol: string;
  price: number;
};

export interface UpdateTicker {
  type: "UPDATE_TICKER",
  tickerIndex: number,
  updatedPrice: number
}
export interface AddTickers {
  type: "ADD_TICKERS";
  tickers: Set<Ticker>;
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
        const tickers = new Set<Ticker>();
        symbols.forEach(symbol => {
          tickers.add({
            symbol: symbol.toLowerCase(),
            price: results[symbol][0].price
          });
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
  UpdateOne(index: number, symbol: string) {
    return function(dispatch: Dispatch<IState>) {
       fetchPrices([symbol]).then(results => {
         const updatedPrice = results[symbol][0].price;

      dispatch<UpdateTicker>({
        type: UPDATE_TICKER,
        tickerIndex: index,
        updatedPrice: updatedPrice
      });
    });
    }
  }
}
