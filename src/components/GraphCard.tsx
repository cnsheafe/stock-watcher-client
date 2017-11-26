import * as React from "react";
import * as Chart from "chart.js";

import GraphAction from "../action-creators/GraphAction";
import ModalAction from "../action-creators/ModalAction";
import store, { IState } from "../store/store";
import { Graph, Company, DataPoints } from "../store/schema";

export default class GraphCard extends React.Component<Graph> implements Graph {
  graphAction: GraphAction;
  modalAction: ModalAction;
  graphId: string;
  index: number;
  company: Company;
  dataset: number[];
  labels: string[];

  constructor(props) {
    super(props);
    this.graphAction = new GraphAction();
    this.modalAction = new ModalAction();

    this.graphId = this.props.graphId;
    this.index = this.props.index;
    this.company = this.props.company;
    this.dataset = this.props.dataset;
    this.labels = this.props.labels;
  }

  render() {
    return [
      <canvas id={this.graphId} />,
      <div className="graph-controls">
        <button
          className="remove"
          onClick={e => this.handleRemove(e)}
        >
          <i className="material-icons red-remove700">remove_circle</i>
          <b>Remove</b>
        </button>
        <button
          className="watch"
          onClick={e => {
            this.handleWatch(this.company.symbol);
          }}
        >
          <i className="material-icons purple-watch700">remove_red_eye</i>
          <b>Watch</b>
        </button>
      </div>
    ];
  }
  componentDidMount() {
    // Attachs the chart.js to the canvas
    let context = document.getElementById(this.graphId) as HTMLCanvasElement;

    let parsedLabels = this.labels.map<string>((label, index) => {
      // Uncomment when Daily API @AlphaVantage becomes live again
      let tmp = label.split(" ")[1];
      return tmp.substring(0, tmp.length - 3);

      // Otherwise, return label
    });

    let config: Chart.ChartConfiguration = this.ChartDataConfigurationBuilder(
      "line",
      this.dataset,
      parsedLabels
    );
    config.options = {
      maintainAspectRatio: false
    };

    config.options.title = {
      display: true,
      fontFamily: "'Lato', sans-serif",
      text: this.company.name
    };
    let chart = new Chart(context, config);
  }

  handleRemove(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(this.props.index);
    store.dispatch(this.graphAction.removeGraph(this.props.index));
    document.getElementById("search-companies").focus();
  }

  handleWatch(symbol: string) {
    store.dispatch(this.modalAction.toggleDisplay(symbol));
  }
  ChartDataConfigurationBuilder(
    type: Chart.ChartType,
    dataPoints: Array<number>,
    labels: Array<string>
  ): Chart.ChartConfiguration {
    let chartDataSets: Chart.ChartDataSets[] = [
      {
        data: dataPoints,
        label: "Stock Price in USD",
        backgroundColor: "#00BCD4",
        borderColor: "#0097A7",
        borderWidth: 5
      }
    ];

    let chartData: Chart.ChartData = {
      datasets: chartDataSets,
      labels: labels
    };

    return {
      type: type,
      data: chartData
    } as Chart.ChartConfiguration;
  }
}
