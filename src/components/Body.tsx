import * as React from "react";

import Search from "./Search";
import SearchPage from './SearchPage';
import Graphs from "./Graphs";
import Modal from "./Modal";
import PageTabs from './PageTabs';
// Presentation Component for the functionality of the app
export class Body extends React.Component {
  render() {
    return(
      <section>
        <PageTabs />
        <SearchPage />
        <Graphs />
        <Modal />
      </section>
    );
  }
}