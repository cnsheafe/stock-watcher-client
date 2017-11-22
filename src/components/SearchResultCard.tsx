import * as React from "react";
import { Company } from "../store/schema";
import store from '../store/store';
import { addGraphAsync } from '../store/actions';
import { Ticker } from '../actions/Tickers';
import '../styles/suggestion-card.scss';

interface ResultCardProps {
  suggestionHandler: (company: Company, Tickers: Set<Ticker>) => (any),
  tickers: Set<Ticker>
  company: Company
}
export default class SearchResultCard extends React.Component<ResultCardProps, {}> {
  constructor(props) {
    super(props);
  }
  render() {
    const company = this.props.company;
    return (
      <div onClick={e => this.props.suggestionHandler(company, this.props.tickers)} className="suggestion-card">
        <i className="material-icons purple700">add_circle</i>
        <p>
          {company.symbol}: {company.name}
        </p>
      </div>
    );
  }
}
