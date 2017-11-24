import GraphAction, { AddGraph, ADD_GRAPH } from "../actions/GraphAction";
import { Company } from "../store/schema";
import { Dispatch } from "redux";
import { IState } from "../store/store";
import { IScheduler } from "rxjs/Scheduler";
class mockGraphAction extends GraphAction {
  addGraph(company: Company) {
    return super.addGraph(company);
  }
  protected fetchPriceHelper(company) {
    return new Promise((resolve, reject) => {
      resolve({
        dataPoints: [1,2,3],
        labels: ["a","b","c"]
      });
    });
  }
}

describe("Graph Action", function() {
  test("it should return object of type AddGraph", () => {
    const company: Company = {
      symbol: "msft",
      name: "Microsoft"
    };
    const mock: Dispatch<IState> = function(action) {
      return action;
    };

    const result = new mockGraphAction().addGraph(company);
    result(mock).then(action => {
      console.log(action);
      expect(action).toHaveProperty("type");
      expect(action).toHaveProperty("company");
      expect(action).toHaveProperty("type");
      expect(action).toHaveProperty("company");

      expect(action.type).toBe(ADD_GRAPH);
      expect(action.company).toEqual(company);
      expect(action.dataPoints).toHaveLength(3);
      expect(action.labels).toHaveLength(3);
    });
  });
});
