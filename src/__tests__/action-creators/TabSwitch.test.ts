import TabSwitch, { SWITCH_TAB } from "../../actions/TabSwitch";
import { Dispatch } from "redux";
import { IState } from "../../store/store";

describe("TabSwitch", function() {
  const mock: Dispatch<IState> = function(action) {
    return action;
  };

  describe("switchPage", function() {
    test("it should return object of type SwitchTab", function() {
      const result = new TabSwitch().switchPage(true)(mock);
      expect(result).toEqual({
        type: SWITCH_TAB,
        isTicker: true
      });
    });
  });
});
