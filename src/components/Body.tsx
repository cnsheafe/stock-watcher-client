import * as React from "react";

import Search from "./Search";
import Graphs from "./Graphs";
import Modal from "./Modal";

// Presentation Component for the functionality of the app
export class Body extends React.Component {
  render() {
    return(
      <section>
        <Search />
        <Graphs />
        <Modal />
      </section>
    );
  }
}