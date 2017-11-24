import { createStore, Reducer, ActionCreator, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import * as Rx from "rxjs/Rx";

import { Graph, Company } from "./schema";

import {
  REMOVE_TICKER,
  UPDATE_TICKER,
  REQUEST_TICKERS,
  Ticker,
  RequestTickers,
  RemoveTicker,
  UpdateTicker
} from "../actions/Tickers";

import {
  ADD_GRAPH,
  REMOVE_GRAPH,
  AddGraph,
  RemoveGraph
} from "../actions/GraphAction";
import {
  ADD_WATCH,
  TOGGLE_MODAL,
  ToggleModalDisplay
} from "../actions/ModalAction";
import {
  SEARCH_RESULT,
  CLEAR_RESULT,
  SearchResult,
  ClearSearchResults
} from "../actions/SearchSuggestions";

import { SWITCH_TAB, SwitchTab } from "../actions/TabSwitch";
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
  | RequestTickers
  | RemoveTicker
  | UpdateTicker
  | SwitchTab;

export function reducer(state: IState, action: ValidAction): IState {
  switch (action.type) {
    case SEARCH_RESULT:
      const searchAction = <SearchResult>action;
      return Object.assign({}, state, { searchResults: searchAction.results });
    case CLEAR_RESULT:
      return Object.assign({}, state, { searchResults: [] });
    case ADD_GRAPH:
      // Assigns a graph an id and index and then adds to the list
      const count: number = state.graphs.length;
      const index: number = count > 0 ? state.graphs[count - 1].index + 1 : 0;

      const newGraphs = [...state.graphs];

      newGraphs.push({
        index: index,
        graphId: `graph${index}`,
        company: action.company,
        dataset: action.dataPoints,
        labels: action.labels
      });

      return Object.assign({}, state, {
        graphs: newGraphs,
        searchResults: []
      });

    case REMOVE_GRAPH:
      const newList = [...state.graphs].filter(graph => {
        return graph.index !== action.index;
      });

      return Object.assign({}, state, {
        graphs: [...newList]
      });

    case TOGGLE_MODAL:
      return Object.assign({}, state, {
        showModal: !state.showModal,
        modalSymbol: (<ToggleModalDisplay>action).symbol
      });
    case REQUEST_TICKERS:
      return Object.assign({}, state, {
        tickers: new Set<Ticker>([...state.tickers, ...action.tickers])
      });
    case REMOVE_TICKER:
      const remainingTickers = new Set<Ticker>([...state.tickers]);
      let tickerToRemove: Ticker;
      remainingTickers.forEach(ticker => {
        if (ticker.symbol.toLowerCase() === action.symbol.toLowerCase()) {
          tickerToRemove = ticker;
        }
      });
      remainingTickers.delete(tickerToRemove);
      return Object.assign({}, state, {
        tickers: new Set<Ticker>([...remainingTickers])
      });
    case UPDATE_TICKER:
      const updatedTickers = new Set<Ticker>([...state.tickers]);
      let tickerToUpdate: Ticker;
      updatedTickers.forEach(ticker => {
        if (
          ticker.symbol.toLowerCase() ===
          action.updatedTicker.symbol.toLowerCase()
        ) {
          tickerToUpdate = ticker;
        }
      });
      updatedTickers.delete(tickerToUpdate);
      updatedTickers.add(action.updatedTicker);
      return Object.assign({}, state, {
        tickers: new Set<Ticker>([...updatedTickers])
      });
    case SWITCH_TAB:
      return Object.assign({}, state, { onTickers: action.isTicker });
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
