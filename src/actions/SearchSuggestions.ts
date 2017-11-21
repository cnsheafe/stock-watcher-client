import { IState } from "../store/store";
import { ActionCreator, Dispatch } from "redux";
import { Company } from "../store/schema";
import fetchCompanies from "../services/fetchCompanies";

export const SEARCH_RESULT = "SEARCH_RESULT";
export interface SearchResult {
  type: "SEARCH_RESULT";
  results: Array<Company>;
}

export interface Suggestions {
    fetchSuggestions: (searchphrase: string) => (any),
}
export default class SearchSuggestions implements Suggestions {
  fetchSuggestions(searchphrase: string) {
    return (dispatch: Dispatch<IState>) => {
      fetchCompanies(searchphrase)
        .then(results => this.parseResults(results))
        .then(companies =>
          dispatch<SearchResult>({
            type: SEARCH_RESULT,
            results: companies
          })
        );
    };
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
