import * as React from "react";
import * as Rx from "rxjs";
import { connect } from "react-redux";
import store from "../store/store";
import { IState } from "../store/store";
import { Company } from "../store/schema";
import { addGraphAsync } from "../store/actions";
import SearchSuggestions from "../actions/SearchSuggestions";

export interface SearchProps {
  searchResults: Array<Company>;
}

// Container Component for searching company stocks
export class Search extends React.Component<SearchProps, {}> {
  private searchSuggestions: SearchSuggestions;
  constructor() {
    super({ searchResults: [] });
    this.searchSuggestions = new SearchSuggestions();
  }
  suggestionHandler(event: React.MouseEvent<HTMLUListElement>) {
    let target = event.target as HTMLElement;
    let element =
      target.className === "search-suggestions-item"
        ? target
        : target.parentElement;

    const company: Company = {
      name: element.dataset.company,
      symbol: element.dataset.symbol
    };
    store.dispatch(addGraphAsync(company));
  }

  render() {
    return (
      <section className="search">
        <label htmlFor="search-companies" className="search-label">
          Search Stocks
        </label>
        <input
          id="search-companies"
          type="text"
          className="search-input"
          placeholder="Type in an Stock Symbol (e.g. MSFT)"
        />
        <h2
          className={
            this.props.searchResults.length > 0 ? "suggestions-title" : "hide"
          }
        />
      </section>
    );
  }
  // Attaches rxjs to the search element for debounce requests
  componentDidMount() {
    const searchElement = document.getElementById(
      "search-companies"
    ) as HTMLInputElement;
    searchElement.onfocus = () => (searchElement.value = "");

    searchElement.addEventListener("keyup", key => {
      if (key.keyCode === 13) {
        searchElement.blur();
      }
    });

    Rx.Observable
      .fromEvent(searchElement, "keyup")
      .debounceTime(300)
      .subscribe(() => {
        if (searchElement.value.length > 0) {
          store.dispatch(
            this.searchSuggestions.fetchSuggestions(searchElement.value)
          );
        }
      });
  }
}

function mapStateToProps(state: IState): SearchProps {
  return {
    searchResults: state.searchResults
  };
}

export default connect(mapStateToProps)(Search);
