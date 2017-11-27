import { ActionCreator, Dispatch } from "redux";
import { IState } from "../store/store";
import { fetchPrices } from "../network-calls/fetchPrices";
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

/**
 * Manages the stock tickers.
 */
export default class TickerAction {

  /**
   * Add stock tickers to the store
   * @param symbols Stock symbols
   */
  RequestMany(symbols: string[]) {
    return (dispatch: Dispatch<IState>): RequestTickers => {
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
  /**
   * Removes a stock symbol
   * @param symbol Stock symbol
   */
  RemoveOne(symbol: string) {
    return (dispatch: Dispatch<IState>): RemoveTicker => {
      return dispatch<RemoveTicker>({
        type: REMOVE_TICKER,
        symbol: symbol
      });
    };
  }

  /**
   * Updates the price of a stock ticker
   * @param symbol Stock symbol
   */
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

  /**
   * Wrapper for requesting stock prices
   * @param symbol Stock symbol
   */
  protected fetchPrices(symbol:string) {
    return fetchPrices([symbol]);
  }
}
