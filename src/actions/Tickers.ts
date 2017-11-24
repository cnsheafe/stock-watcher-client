import { ActionCreator, Dispatch } from "redux";
import { IState } from "../store/store";
import { fetchPrices } from "../services/fetchPrices";
export const REMOVE_TICKER = "REMOVE_TICKER";
export const UPDATE_TICKER = "UPDATE_TICKER";
export const REQUEST_TICKERS = "REQUEST_TICKERS";

export type Ticker = {
  symbol: string;
  price: number;
};

export interface UpdateTicker {
  type: "UPDATE_TICKER";
  updatedTicker: Ticker;
}
export interface RequestTickers {
  type: "REQUEST_TICKERS";
  tickers: Set<Ticker>;
}

export interface RemoveTicker {
  type: "REMOVE_TICKER";
  symbol: string;
}

export default class Tickers {

  RequestMany(symbols: string[]) {
    return (dispatch: Dispatch<IState>) => {
      const tickers = new Set<Ticker>();
      symbols.forEach(symbol => {
        tickers.add({
          symbol: symbol.toLowerCase(),
          price: 0
        });
      });

      return dispatch<RequestTickers>({
        type: REQUEST_TICKERS,
        tickers: tickers
      });
    };
  }

  RemoveOne(symbol: string) {
    return (dispatch: Dispatch<IState>) => {
      return dispatch<RemoveTicker>({
        type: REMOVE_TICKER,
        symbol: symbol
      });
    };
  }
  UpdateOne(symbol: string) {
    return (dispatch: Dispatch<IState>) => {
      return this.fetchPrices(symbol).then(results => {
        const updatedPrice =
          results[symbol] === null ? 0 : results[symbol][0].price;
        const ticker: Ticker = {
          symbol: symbol,
          price: updatedPrice
        };
        return dispatch<UpdateTicker>({
          type: UPDATE_TICKER,
          updatedTicker: ticker
        });
      });
    };
  }
  protected fetchPrices(symbol:string) {
    return fetchPrices([symbol]);
  }
}
