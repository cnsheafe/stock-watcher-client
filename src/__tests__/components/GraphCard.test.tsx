import * as React from "react";
import GraphCard from "../../components/GraphCard";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Graph, Company } from "../../store/schema";

(Enzyme as any).configure({ adapter: new Adapter() });

class MockGraphCard extends GraphCard {
  componentDidMount() {
    // doNothing!
  }
}

describe("Graph Card", function() {
  const graphProps: Graph = {
    index: 0,
    graphId: "graph0",
    company: {
      symbol: "msft",
      name: "Microsoft"
    },
    dataset: [1, 2, 3],
    labels: [
      "2017-11-24 13:00:00",
      "2017-11-24 12:59:00",
      "2017-11-24 12:58:00"
    ]
  };

  test("should render a canvas, and two buttons", function() {
    const wrapper = Enzyme.shallow(
      <MockGraphCard
        index={graphProps.index}
        graphId={graphProps.graphId}
        company={graphProps.company}
        dataset={graphProps.dataset}
        labels={graphProps.labels}
      />
    );
    const fragments = wrapper.instance().render();
    expect(Enzyme.shallow(<div>{fragments}</div>).find('canvas')).toHaveLength(1);
    expect(Enzyme.shallow(<div>{fragments}</div>).find('button')).toHaveLength(2);
  });
});
