import * as React from "react";
import { connect } from "react-redux";
import GraphCard from "./GraphCard";

import store, { IState } from "../store/store";
import { Graph } from "../store/schema";
import "../styles/graphs.scss";
interface GraphsProps {
  graphs: Graph[];
}

// Container Component for a list of graphs
class Graphs extends React.Component<GraphsProps, {}> {

  render() {
    const graphs = [...this.props.graphs].map<JSX.Element>(
      (graph: Graph, index: number) => {
        return (
          <li key={index} className="graphs-list-item">
            <GraphCard
              graphId={graph.graphId}
              index={graph.index}
              company={graph.company}
              dataset={graph.dataset}
              labels={graph.labels}
            />
          </li>
        );
      }
    );
    return (
      <ul id="graphs" className={graphs.length > 0 ? "graphs-list" : "hide"}>
        {graphs}
      </ul>
    );
  }
}

function mapStateToProps(state: IState) {
  return {
    graphs: state.graphs
  };
}

export default connect(mapStateToProps)(Graphs);
