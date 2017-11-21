import * as React from "react";
import { Company } from "../store/schema";
import store from '../store/store';
import { addGraphAsync } from '../store/actions';

interface ResultCardProps {
  suggestionHandler: (company: Company) => (any),
  company: Company
}
export default class SearchResultCard extends React.Component<ResultCardProps, {}> {
  render() {
    const company = this.props.company;
    return (
      <div onClick={e => this.props.suggestionHandler(company)}>
        <i className="material-icons purple700">add_circle</i>
        <p>
          {company.symbol}: {company.name}
        </p>
      </div>
    );
  }
}
