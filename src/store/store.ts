import { createStore, Reducer, ActionCreator, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import * as Rx from "rxjs/Rx";

import { Graph, Company } from "./schema";
import {
  ADD_GRAPH,
  REM_GRAPH,
  TOGGLE_MODAL,
  ADD_WATCH,
  AddGraph,
  RemoveGraph,
  ToggleModalDisplay
} from "./actions";

import {
  ADD_TICKERS,
  REMOVE_TICKER,
  UPDATE_TICKER,
  Ticker,
  AddTickers,
  RemoveTicker,
  UpdateTicker
} from "../actions/Tickers";

import {
  SEARCH_RESULT, CLEAR_RESULT, SearchResult, ClearSearchResults
} from '../actions/SearchSuggestions';
// Shape of the App State
export interface IState {
  searchResults: Array<Company>;
  graphs: Array<Graph>;
  showModal: boolean;
  modalSymbol: string;
  tickers: Set<Ticker>;
  onTickers: boolean;
}

// TypeCheck on the reducer
type ValidAction =
  | SearchResult
  | ClearSearchResults
  | AddGraph
  | RemoveGraph
  | ToggleModalDisplay
  | AddTickers
  | RemoveTicker
  | UpdateTicker;

export function reducer(state: IState, action: ValidAction): IState {
  switch (action.type) {
    case SEARCH_RESULT:
      const searchAction = <SearchResult>action;
      return Object.assign({}, state, { searchResults: searchAction.results });
    case CLEAR_RESULT:
      return Object.assign({}, state, { searchResults: []})
    case ADD_GRAPH:
      // Assigns a graph an id and index and then adds to the list
      const graphAction = <AddGraph>action;
      const count: number = state.graphs.length;
      const index: number = count > 0 ? state.graphs[count - 1].index + 1 : 0;
      const newGraph: Graph = {
        index: index,
        graphId: `graph${index}`,
        company: graphAction.company,
        dataset: graphAction.dataPoints,
        labels: graphAction.labels
      };

      return Object.assign({}, state, {
        graphs: [...state.graphs, newGraph],
        searchResults: []
      });

    case REM_GRAPH:
      const indexToRemove = state.graphs.findIndex(elm => {
        return elm.graphId === (<RemoveGraph>action).graphId;
      });

      const newGraphList = [...state.graphs];
      newGraphList.splice(indexToRemove, 1);

      return Object.assign({}, state, {
        graphs: newGraphList
      });

    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        showModal: !state.showModal,
        modalSymbol: (<ToggleModalDisplay>action).symbol
      });
    case ADD_TICKERS:
      const addTickerAction = <AddTickers>action;
      return Object.assign({}, state, {
        tickers: new Set<Ticker>([...addTickerAction.tickers, ...state.tickers])
      });
    case REMOVE_TICKER:
      const remainingTickers = [...state.tickers];
      remainingTickers.splice(action.tickerIndex, 1);
      return Object.assign({}, state, {
        tickers: new Set<Ticker>([...remainingTickers])
      });
    case UPDATE_TICKER:
      const updatedTickers = [...state.tickers];
      updatedTickers[action.tickerIndex].price = action.updatedPrice;
      return Object.assign({}, state, {
        tickers: new Set<Ticker>([...updatedTickers])
      })
    default:
      return state;
  }
}

const initialState: IState = {
  searchResults: [],
  graphs: [],
  showModal: false,
  modalSymbol: "",
  tickers: new Set<Ticker>(),
  onTickers: true
};

export default createStore(reducer, initialState, applyMiddleware(thunk));
