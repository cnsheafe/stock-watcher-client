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
import { TOGGLE_MODAL, ToggleModalDisplay } from "../actions/ModalAction";
import {
  Ticker,
  REQUEST_TICKERS,
  UPDATE_TICKER,
  RequestTickers,
  RemoveTicker,
  UpdateTicker,
  REMOVE_TICKER
} from "../actions/Tickers";

import { Company } from "../store/schema";

// Prologue
// The reducer should accept incoming actions
// and return the updated state correctly
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

  const mockTickers: Ticker[] = [
    {
      symbol: "msft",
      price: 10.0
    },
    {
      symbol: "amd",
      price: 5.0
    }
  ];

  const toggleModal = (): ToggleModalDisplay => {
    return {
      type: TOGGLE_MODAL
    };
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

  const addTickers = (tickers: Ticker[]): RequestTickers => {
    return {
      type: REQUEST_TICKERS,
      tickers: new Set<Ticker>(tickers)
    };
  };

  const removeTicker = (symbol: string): RemoveTicker => {
    return {
      type: REMOVE_TICKER,
      symbol: symbol
    };
  };

  const updateTicker = (symbol: string): UpdateTicker => {
    return {
      type: UPDATE_TICKER,
      updatedTicker: {
        symbol: "msft",
        price: 15.0
      }
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

  describe("TOGGLE_MODAL", function() {
    test("modal state should be toggled to true", function() {
      let newState = reducer(mockState, toggleModal());
      expect(newState.showModal).toBe(true);
    });
  });

  describe("REQUEST_TICKERS", function() {
    const mockTickers: Ticker[] = [
      {
        symbol: "msft",
        price: 10.0
      },
      {
        symbol: "amd",
        price: 5.0
      }
    ];
    test("tickers should be non-empty and length 2", function() {
      let newState = reducer(mockState, addTickers(mockTickers));
      const myTickers = [...newState.tickers];
      expect(myTickers).toHaveLength(2);
      expect(myTickers).toEqual(mockTickers);
    });
  });
  describe("REMOVE_TICKERS", function() {
    test("tickers should have length 1", function() {
      let newState = reducer(mockState, addTickers(mockTickers));
      newState = reducer(newState, removeTicker("msft"));
      const remainingTickers = [...newState.tickers];
      expect(remainingTickers).toHaveLength(1);
      expect(remainingTickers).toEqual([
        {
          symbol: "amd",
          price: 5.0
        }
      ]);
    });
  });
  describe("UPDATE_TICKER", function() {
    test("msft ticker price should update from 10 to 15", function() {
      let newState = reducer(mockState, addTickers(mockTickers));
      newState = reducer(mockState, updateTicker("msft"));
      const remainingTickers = [...newState.tickers];
      const freshTickers = [...mockTickers];
      freshTickers[0].price = 15.0;
      console.log(mockTickers);
      console.log(freshTickers);
      console.log(remainingTickers);
      expect(remainingTickers).toHaveLength(2);
      expect(remainingTickers).toEqual(freshTickers);
    });
  });
});
