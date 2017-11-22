import { IState } from "../store/store";
import { ActionCreator, Dispatch } from "redux";
import { Company } from "../store/schema";
import fetchCompanies from "../services/fetchCompanies";
import { fetchPrices } from "../services/fetchPrices";

export const ADD_GRAPH = "ADD_GRAPH";

export interface AddGraph {
  type: "ADD_GRAPH";
  company: Company;
  dataPoints: Array<number>;
  labels: Array<string>;
}

export default class Graphs {
  addGraph(company: Company) {
    return function(dispatch: Dispatch<IState>) {
      return fetchPrices([company.symbol]).then(results => {
        const c = results[company.symbol.toUpperCase()];
        let dataPoints = [];
        let labels = [];

        for (var i = c.length - 1; i >= 0; i--) {
          dataPoints.push(c[i].price);
          labels.push(c[i].timeStamp);
        }

        dispatch<AddGraph>({
          type: ADD_GRAPH,
          company: company,
          dataPoints: dataPoints,
          labels: labels
        });
      });
    };
  }
}
