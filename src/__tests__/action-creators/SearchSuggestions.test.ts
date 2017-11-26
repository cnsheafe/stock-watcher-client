import SearchSuggestions, {
  SEARCH_RESULT,
  CLEAR_RESULT
} from "../../actions/SearchSuggestions";
import { IState } from "../../store/store";
import { Dispatch } from "redux";

describe("SearchSuggestions", function() {
  const mock: Dispatch<IState> = function(action) {
    return action;
  };

  describe("fetchSuggestions", function() {
    test("it should return object of type SearchResults", function() {
      const searchphrase = "blahblah";

      const result = new mockSuggestions().fetchSuggestions(searchphrase);
      result(mock).then(action => {
        console.log(action);
        expect(action).toEqual({
          type: SEARCH_RESULT,
          results: [{ symbol: "msft", name: "Microsoft" }]
        });
      });
    });
  });
  describe("clearSuggestions", function() {
    test("it should return object of type ClearSearchResults", function() {
      const result = new mockSuggestions().clearSuggestions();
      const newResult = result(mock);
      expect(newResult.type).toBe(CLEAR_RESULT);
    });
  });
});

class mockSuggestions extends SearchSuggestions {
  fetchSuggestions(searchphrase: any) {
    return super.fetchSuggestions(searchphrase);
  }
  clearSuggestions() {
    return super.clearSuggestions();
  }
  protected fetchCompanies(searchphrase: string) {
    return new Promise((resolve, reject) => {
      resolve([
        {
          symbol: "msft",
          name: "Microsoft"
        }
      ]);
    });
  }
}
