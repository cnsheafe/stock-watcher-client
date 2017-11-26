import { IState } from "../store/store";
import { ActionCreator, Dispatch } from "redux";
import { Company } from "../store/schema";
import fetchCompanies from "../network-calls/fetchCompanies";
import { fetchPrices } from "../network-calls/fetchPrices";

export const ADD_GRAPH = "ADD_GRAPH";
export const REMOVE_GRAPH = "REMOVE_GRAPH";

export interface AddGraph {
  type: "ADD_GRAPH";
  company: Company;
  dataPoints: Array<number>;
  labels: Array<string>;
}

export interface RemoveGraph {
  type: "REMOVE_GRAPH";
  index: number;
}

export default class GraphAction {

  addGraph(company: Company) {
    return (dispatch: Dispatch<IState>) => {
      return this.fetchPriceHelper(company).then(data => {
        return dispatch<AddGraph>({
          type: ADD_GRAPH,
          company: company,
          dataPoints: data.dataPoints,
          labels: data.labels
        });
      });
    };
  }

  removeGraph(index: number) {
    return (dispatch: Dispatch<IState>) => {
      return dispatch<RemoveGraph>({
        type: REMOVE_GRAPH,
        index: index
      });
    };
  }

  protected fetchPriceHelper(company) {
    return fetchPrices([company.symbol]).then(results => {
      const c = results[company.symbol.toUpperCase()];
      let dataPoints = [];
      let labels = [];

      for (var i = c.length - 1; i >= 0; i--) {
        dataPoints.push(c[i].price);
        labels.push(c[i].timeStamp);
      }

      return {
        dataPoints: dataPoints,
        labels: labels
      };
    });
  }
}
