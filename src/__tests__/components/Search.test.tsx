import * as React from "react";
import { Search } from "../../components/Search";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Graph, Company } from "../../store/schema";
import { Children } from "react";

(Enzyme as any).configure({ adapter: new Adapter() });

class MockSearch extends Search {
  componentDidMount() {
    // Do nothing!
  }
}

describe("Search", function() {
  const companies: Company[] = [
    { symbol: "msft", name: "Microsoft" },
    { symbol: "amd", name: "AMD" }
  ];
  test("should render a section with a label, input, and h2", function() {
    const wrapper = Enzyme.shallow(<MockSearch searchResults={companies} />);
    expect(wrapper.find("section")).toHaveLength(1);
    expect(wrapper.find("label")).toHaveLength(1);
    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("h2")).toHaveLength(1);
  });
  test("should have h2 with class 'suggestions-title' when results are non-empty", function() {
    const wrapper = Enzyme.shallow(<MockSearch searchResults={companies} />);
    expect(wrapper.find("h2").hasClass("suggestions-title"));
  });
});
