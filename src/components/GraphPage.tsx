import * as React from "react";

import Search from "./Search";
import SuggestionsList from "./SuggestionsList";
import GraphList from "./GraphList";
import Modal from "./Modal";


// Represents the page for Graphs of the app
export default class GraphPage extends React.Component {
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