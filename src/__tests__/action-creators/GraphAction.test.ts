import GraphAction, { AddGraph, ADD_GRAPH, REMOVE_GRAPH } from "../../actions/GraphAction";
import { Company } from "../../store/schema";
import { Dispatch } from "redux";
import { IState } from "../../store/store";
import { IScheduler } from "rxjs/Scheduler";
class mockGraphAction extends GraphAction {
  addGraph(company: Company) {
    return super.addGraph(company);
  }
  protected fetchPriceHelper(company) {
    return new Promise((resolve, reject) => {
      resolve({
        dataPoints: [1, 2, 3],
        labels: ["a", "b", "c"]
      });
    });
  }
}

describe("Graph Action", function() {
  const mock: Dispatch<IState> = function(action) {
    return action;
  };

  describe("addGraph", function() {
    test("it should return object of type AddGraph", () => {
      const company: Company = {
        symbol: "msft",
        name: "Microsoft"
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
  describe("removeGraph", function() {
    test("it should return object of type RemoveGraph", () => {
      const result = new mockGraphAction().removeGraph(1)(mock);
      expect(result).toEqual({
        type: REMOVE_GRAPH,
        index: 1
      });
    });
  });
});
