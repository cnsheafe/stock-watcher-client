import { IState } from "../store/store";
import { ActionCreator, Dispatch } from "redux";

export const SWITCH_TAB = "SWITCH_TAB";
export interface SwitchTab {
  type: "SWITCH_TAB";
  isTicker: boolean;
}

/**
 * Handles notifying the store when moved to a new page
 */
export default class TabSwitch {
/**
 * Changes state when page is switched
 * @param toTicker Whether we are on the ticker page
 */
  switchPage(toTicker: boolean) {
    return (dispatch: Dispatch<IState>): SwitchTab => {
      return dispatch<SwitchTab>({
        type: SWITCH_TAB,
        isTicker: toTicker
      });
    };
  }
}
