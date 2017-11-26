import { IState } from "../store/store";
import { ActionCreator, Dispatch } from "redux";
import { Company } from "../store/schema";
import fetchCompanies from "../network-calls/fetchCompanies";

export const SEARCH_RESULT = "SEARCH_RESULT";
export const CLEAR_RESULT = "CLEAR_RESULT";
export interface SearchResult {
  type: "SEARCH_RESULT";
  results: Array<Company>;
}

export interface ClearSearchResults {
  type: "CLEAR_RESULT";
}

export interface Suggestions {
  fetchSuggestions: (searchphrase: string) => any;
}
export default class SearchSuggestions implements Suggestions {
  fetchSuggestions(searchphrase: string) {
    return (dispatch: Dispatch<IState>) => {
      return this.fetchCompanies(searchphrase)
        .then(results => this.parseResults(results))
        .then(companies =>
          dispatch<SearchResult>({
            type: SEARCH_RESULT,
            results: companies
          })
        );
    };
  }

  clearSuggestions() {
    return (dispatch: Dispatch<IState>) =>
      dispatch<ClearSearchResults>({
        type: CLEAR_RESULT
      });
  }

  protected fetchCompanies(searchphrase) {
    return fetchCompanies(searchphrase);
  }

  protected parseResults(results) {
    const companies: Company[] = results.map(company => {
      return {
        symbol: company.symbol,
        name: company.name
      } as Company;
    });
    return companies;
  }
}
