import { reducer, IState } from "../store/store";

import {
  SearchResult,
  SEARCH_RESULT,
  ClearSearchResults,
  CLEAR_RESULT
} from "../actions/SearchSuggestions";
import {
  ADD_GRAPH,
  AddGraph,
  REMOVE_GRAPH,
  RemoveGraph
} from "../actions/GraphAction";
import { Company } from "../store/schema";
import { Ticker } from "../actions/Tickers";

// // Prologue
// // The reducer should accept incoming actions
// //  and return the updated state correctly

describe("Reducer", function() {
  let mockState: IState;
  const mockCompanyMSFT: Company = {
    symbol: "msft",
    name: "Microsoft"
  };

  const mockCompanyAMD: Company = {
    symbol: "amd",
    name: "AMD"
  };
  const addGraph = (company: Company): AddGraph => {
    return {
      type: ADD_GRAPH,
      company: mockCompanyMSFT,
      dataPoints: [1, 2, 3],
      labels: ["a", "b", "c"]
    };
  };
  const removeGraph = (index): RemoveGraph => {
    return {
      type: REMOVE_GRAPH,
      index: index
    };
  };

  beforeEach(function() {
    mockState = {
      searchResults: [],
      graphs: [],
      showModal: false,
      modalSymbol: "",
      tickers: new Set<Ticker>(),
      onTickers: true
    };
  });

  describe("SEARCH_RESULT", function() {
    test("searchResults should not be empty", function() {
      const searchAction: SearchResult = {
        type: SEARCH_RESULT,
        results: [
          {
            symbol: "msft",
            name: "Microsoft"
          },
          {
            symbol: "amd",
            name: "AMD"
          }
        ]
      };

      const newState = reducer(mockState, searchAction);
      expect(newState.searchResults).toHaveLength(searchAction.results.length);
      expect(newState.searchResults).toEqual(searchAction.results);
      // expect(newState).toEqual(
      //   Object.assign({}, mockState, {
      //     searchResults: searchAction.results
      //   })
      // );
    });
  });

  describe("CLEAR_RESULT", function() {
    const clearAction: ClearSearchResults = {
      type: CLEAR_RESULT
    };
    test("searchResults should be empty", function() {
      mockState.searchResults = [mockCompanyMSFT, mockCompanyAMD];
      const newState = reducer(mockState, clearAction);
      expect(newState.searchResults).toHaveLength(0);
    });
  });

  describe("ADD_GRAPH", function() {
    test("graphs should be non-empty", function() {
      const newState = reducer(mockState, addGraph(mockCompanyMSFT));
      expect(newState.graphs).toHaveLength(1);
      expect(newState.graphs).toEqual([
        {
          company: mockCompanyMSFT,
          dataset: [1, 2, 3],
          graphId: "graph0",
          index: 0,
          labels: ["a", "b", "c"]
        }
      ]);
    });
  });

  describe("REMOVE_GRAPH", function() {
    test("graphs should have length 1", function() {
      let newState = reducer(mockState, addGraph(mockCompanyMSFT));
      newState = reducer(newState, addGraph(mockCompanyAMD));
      newState = reducer(newState, removeGraph(1));
      expect(newState.graphs).toHaveLength(1);
      expect(newState.graphs).toEqual([
        {
          company: mockCompanyMSFT,
          dataset: [1, 2, 3],
          graphId: "graph0",
          index: 0,
          labels: ["a", "b", "c"]
        }
      ]);
    });
  });
});
