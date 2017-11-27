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

/**
 * Handles creating and clearing search suggestions
 */
export default class SearchSuggestions implements Suggestions {

  /**
   * Requests possible stock matches to the searchphrase
   * @param searchphrase String to match either stock or company name
   */
  fetchSuggestions(searchphrase: string) {
    return (dispatch: Dispatch<IState>): Promise<SearchResult> => {
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

  /**
   * Clears the search suggestions list from the store
   */
  clearSuggestions() {
    return (dispatch: Dispatch<IState>): ClearSearchResults =>
      dispatch<ClearSearchResults>({
        type: CLEAR_RESULT
      });
  }

  /**
   * Wrapper to get matching companies
   * @param searchphrase - string to match stock or company name
   */
  protected fetchCompanies(searchphrase) {
    return fetchCompanies(searchphrase);
  }

  /**
   * Parses companies for symbol and name
   * @param results 
   */
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
