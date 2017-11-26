import * as React from "react";
import Nav from "../../components/Nav";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

(Enzyme as any).configure({ adapter: new Adapter() });

describe("Nav", function() {
  test("should render a list with 2 links", function() {
    const wrapper = Enzyme.shallow(<Nav />);
    expect(wrapper.find("ul")).toHaveLength(1);
    expect(wrapper.find("li")).toHaveLength(2);
    expect(wrapper.find("ul").hasClass("page-tabs")).toBe(true);
    expect(
      wrapper
        .find("li")
        .first()
        .hasClass("ticker-link")
    ).toBe(true);
    expect(
      wrapper
        .find("li")
        .last()
        .hasClass("graph-link")
    ).toBe(true);
  });
});
