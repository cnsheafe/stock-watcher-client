import { Dispatch } from "redux";
import { IState } from "../../store/store";

import Tickers, {
  UPDATE_TICKER,
  REQUEST_TICKERS,
  REMOVE_TICKER,
  Ticker
} from "../../actions/Tickers";

describe("Tickers", function() {
  const mock: Dispatch<IState> = function(action) {
    return action;
  };

  describe("RequestMany", function() {
    test("it should return object of type RequestTickers", function() {
      const result = new Tickers().RequestMany(["msft", "amd"]);
      console.log(result(mock));
      const mockTickers: Ticker[] = [
        { symbol: "msft", price: 0 },
        { symbol: "amd", price: 0 }
      ];
      expect(result(mock).type).toBe(REQUEST_TICKERS);
      expect(result(mock).tickers).toEqual(new Set<Ticker>(mockTickers));
    });
  });

  describe("RemoveOne", function() {
    test("it should return object of type RemoveTicker", function() {
      const result = new Tickers().RemoveOne("msft")(mock);
      expect(result).toEqual({
        type: REMOVE_TICKER,
        symbol: "msft"
      });
    });
  });

  describe("UpdateOne", function() {
    test("it should return object of type UpdateTicker", function() {
      const result = new mockTickers().UpdateOne("msft");
      result(mock).then(actions => {
        console.log(actions);
        expect(actions).toEqual({
          type: UPDATE_TICKER,
          updatedTicker: {
            symbol: "msft",
            price: 10
          }
        });
      });
    });
  });
});

class mockTickers extends Tickers {
  UpdateOne(symbol: string) {
    return super.UpdateOne(symbol);
  }
  protected fetchPrices(symbol: string) {
    return new Promise((resolve, reject) => {
      resolve({
        msft: [{ price: 10 }]
      });
    });
  }
}
