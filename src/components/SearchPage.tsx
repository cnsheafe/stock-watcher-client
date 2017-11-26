import * as React from "react";

import Search from "./Search";
import SuggestionsList from "./SuggestionsList";
import GraphList from "./GraphList";
import Modal from "./Modal";
// Presentation Component for the functionality of the app
export default class Body extends React.Component {
  render() {
    return(
      <section>
        <Search />
        <SuggestionsList />
        <GraphList />
        <Modal />
      </section>
    );
  }
}