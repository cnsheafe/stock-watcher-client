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

/**
 * Creates actions for managing graph state in the store.
 */
export default class GraphAction {
  /**
   * Adds a graph to the store
   * @param company {Company} Company symbol and name
   */
  addGraph(company: Company) {
    return (dispatch: Dispatch<IState>): Promise<AddGraph> => {
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
  /**
   * Removes a graph at the specified index
   * @param {number} index - Index in the store.graphs array
   */
  removeGraph(index: number) {
    return (dispatch: Dispatch<IState>):RemoveGraph => {
      return dispatch<RemoveGraph>({
        type: REMOVE_GRAPH,
        index: index
      });
    };
  }
  /**
   * Wrapper for request to get stock prices
   * @param company 
   * @return Timeseries of stock prices
   */
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
