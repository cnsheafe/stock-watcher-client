import { IState } from "../store/store";
import { Dispatch } from "redux";
import postWatch from "../services/postWatch";

export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const ADD_WATCH = "ADD_WATCH";

export interface ToggleModalDisplay {
  type: "TOGGLE_MODAL";
  symbol?: string;
}

export default class ModalAction {
  toggleDisplay(symbol?: string) {
    return (dispatch: Dispatch<IState>) => {
      return dispatch<ToggleModalDisplay>({
        type: TOGGLE_MODAL,
        symbol: symbol
      });
    };
  }

  addWatch(symbol: string, targetPrice: number, phoneNumber: string) {
    return (dispatch: Dispatch<IState>) => {
      return this.postWatch(symbol, targetPrice, phoneNumber).then(status => {
        if (status === 201) {
          return dispatch<ToggleModalDisplay>({
            type: TOGGLE_MODAL
          });
        } else {
          return null;
        }
      });
    };
  }

  protected postWatch(
    symbol: string,
    targetPrice: number,
    phoneNumber: string
  ) {
    return postWatch(symbol, phoneNumber, targetPrice);
  }
}
