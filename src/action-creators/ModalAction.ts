import { IState } from "../store/store";
import { Dispatch } from "redux";
import postWatch from "../network-calls/postWatch";

export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const ADD_WATCH = "ADD_WATCH";

export interface ToggleModalDisplay {
  type: "TOGGLE_MODAL";
  symbol?: string;
}

/**
 * Responsible for displaying the modal and setting up watches
 */
export default class ModalAction {
  /**
   * Toggles the display of the modal
   * @param symbol Stock symbol of the company
   */
  toggleDisplay(symbol?: string) {
    return (dispatch: Dispatch<IState>): ToggleModalDisplay => {
      return dispatch<ToggleModalDisplay>({
        type: TOGGLE_MODAL,
        symbol: symbol
      });
    };
  }
  /**
   * Requests a watch on a stock. If the target price is exceeded
   * an SMS alert is made from the backend.
   * @param symbol Stock symbol
   * @param targetPrice Price to exceed to trigger alert
   * @param phoneNumber Phone number to send the alert to
   */
  addWatch(symbol: string, targetPrice: number, phoneNumber: string) {
    return (dispatch: Dispatch<IState>): Promise<ToggleModalDisplay> => {
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
  /**
   * Wrapper for requesting a watch
   * @param symbol Stock symbol
   * @param targetPrice Price to exceed
   * @param phoneNumber Phone number to send the alert to 
   */
  protected postWatch(
    symbol: string,
    targetPrice: number,
    phoneNumber: string
  ) {
    return postWatch(symbol, phoneNumber, targetPrice);
  }
}
