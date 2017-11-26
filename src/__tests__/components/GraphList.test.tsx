import * as React from "react";
import { GraphList, GraphsProps } from "../../components/GraphList";
import GraphCard from "../../components/GraphCard";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Graph, Company } from "../../store/schema";

(Enzyme as any).configure({ adapter: new Adapter() });

describe("GraphList", function() {
  const mockListOfGraphs: Graph[] = [
    {
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
    },
    {
      index: 1,
      graphId: "graph1",
      company: {
        symbol: "amd",
        name: "AMD"
      },
      dataset: [34, 11, 15],
      labels: ["apple", "orange", "banana"]
    }
  ];

  test("should render a list with two items", function() {
    const wrapper = Enzyme.shallow(<GraphList graphs={mockListOfGraphs} />);
    expect(wrapper.find('ul')).toHaveLength(1);
    expect(wrapper.find('ul').children()).toHaveLength(2);
  });
  test("should have class graphs-list when non-empty", function() {
    const wrapper = Enzyme.shallow(<GraphList graphs={mockListOfGraphs} />);
    expect(wrapper.find('ul').hasClass('graphs-list')).toBe(true);
  })
});
