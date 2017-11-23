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
