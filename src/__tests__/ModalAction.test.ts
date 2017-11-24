import { Dispatch } from "redux";
import { IState } from "../store/store";
import ModalAction, { TOGGLE_MODAL, ADD_WATCH } from "../actions/ModalAction";

describe("Modal Action", function() {
  const mock: Dispatch<IState> = function(action) {
    return action;
  };

  describe("toggleDisplay", function() {
    test("it should return object of type ToggleModalDisplay", function() {
      const result = new mockModalAction().toggleDisplay("msft")(mock);
      expect(result).toEqual({
        type: TOGGLE_MODAL,
        symbol: "msft"
      });
    });
  });

  describe("addWatch", function() {
    test("it should return object of type ToggleModalDisplay", function() {
      const result = new mockModalAction()
        .addWatch("msft", 10, "123")(mock)
        .then(action => {
          expect(action).toEqual({
            type: TOGGLE_MODAL,
            symbol: "msft"
          });
        });
    });
  });
});
class mockModalAction extends ModalAction {
  addWatch(symbol: string, price: number, phone: "123") {
    return super.addWatch(symbol, price, phone);
  }
  protected postWatch(
    symbol: string,
    targetPrice: number,
    phoneNumber: string
  ) {
    return new Promise<number>((resolve, reject) => {
      resolve(201);
    });
  }
}
