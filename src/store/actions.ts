import { ActionCreator, Dispatch } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
const fetch = require("isomorphic-fetch");

import { Company, Graph } from "./schema";
import { IState } from "./store";

// Action Commands
export const SEARCH = "SEARCH_RESULT";
const LOGIN = "LOGGED_IN";
export const ADD_GRAPH = "ADD_GRAPH";
export const REM_GRAPH = "REMOVE_GRAPH";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const ADD_WATCH = "ADD_WATCH";

// Action Interfaces
export interface LoginAction { type: "LOGGED_IN" }

export interface SearchResult {
  type: "SEARCH_RESULT",
  results: Array<Company>
}

export interface AddGraph {
  type: "ADD_GRAPH",
  company: Company,
  dataPoints: Array<number>,
  labels: Array<string>
}

export interface RemoveGraph {
  type: "REMOVE_GRAPH",
  graphId: string
}

export interface ToggleModalDisplay {
  type: "TOGGLE_MODAL",
  symbol?: string
}

// Action for updating state with list of matching company names from database
// Used on Search.tsx
export const ListSearchResults: ActionCreator<SearchResult> =
  (results: Array<Company>) => {
    return {
      type: SEARCH,
      results: results
    }
  }

// End result dispatches AddGraph
export const addGraphAsync = 
  (company: Company) => {

    return function(dispatch: Dispatch<IState>) {
      const url = '/stockprice';
      const options = {
        method: 'POST',
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          symbols: [company.symbol]
        })
      };

      return fetch(url,options)
        .then(res => {
          return res.json();
        })
        .then((results) => {
          const c = results[company.symbol.toUpperCase()];
          let dataPoints = [];
          let labels = [];

          for (var i = c.length - 1; i >= 0 ; i--) {
            dataPoints.push(c[i].price);
            labels.push(c[i].timeStamp);
          }

          dispatch<AddGraph>({
            type: ADD_GRAPH,
            company: company,
            dataPoints: dataPoints,
            labels: labels
          });
        })
    }
  }


export const removeGraph: ActionCreator<RemoveGraph> = (graphId: string) => {
  return {
    type: REM_GRAPH,
    graphId: graphId
  }
}

export const toggleModalDisplay: ActionCreator<ToggleModalDisplay> = (symbol?: string) => {
  return {
    type: TOGGLE_MODAL,
    symbol: symbol
  }
}

// End result returns a boolean and dispatches a ToggleModalAction
export const addWatchAsync = 
  (symbol: string, 
  targetPrice: number, 
  phoneNumber: string) => {
  return function(dispatch: Dispatch<IState>): Promise<boolean> {
    let header;
      header = new Headers({"Content-Type": "application/json"});
      
    let bodyBlob = new Blob(
      [
        JSON.stringify(
        {
          symbol: symbol,
          phone: phoneNumber,
          price: targetPrice
        })
      ]
    );

    let watchRequest = new Request(
      "/notifications/watchprice", {
      method: "POST",
      body: bodyBlob,
      headers: header
    });

    return fetch(watchRequest)
      .then(res => {
        return res.status;
      })
      .then(status => {
        if (status === 201) {
          dispatch<ToggleModalDisplay>({
            type: TOGGLE_MODAL
          });
          return true;
        }
        return false;
      });
  }
}