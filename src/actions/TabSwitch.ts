import { IState } from "../store/store";
import { ActionCreator, Dispatch } from "redux";

export const SWITCH_TAB = "SWITCH_TAB";
export interface SwitchTab {
  type: "SWITCH_TAB";
  isTicker: boolean;
}
export default class TabSwitch {
  switchPage(toTicker: boolean) {
    return (dispatch: Dispatch<IState>) => {
      return dispatch<SwitchTab>({
        type: SWITCH_TAB,
        isTicker: toTicker
      });
    };
  }
}
