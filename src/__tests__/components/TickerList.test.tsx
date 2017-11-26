import * as React from "react";
import { TickerList } from "../../components/TickerList";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Ticker } from "../../action-creators/TickerAction";
import { Graph, Company } from "../../store/schema";

(Enzyme as any).configure({ adapter: new Adapter() });

describe("TickerList", function() {
  const mockTickers: Set<Ticker> = new Set<Ticker>([
    {
      symbol: "msft",
      price: 10.0
    },
    {
      symbol: "amd",
      price: 5.0
    }
  ]);
  test("should render a div containing a div and ul", function() {
    const wrapper = Enzyme.shallow(<TickerList tickers={mockTickers} />);
    expect(
      wrapper
        .find("div")
        .first()
        .find("div")
        .exists()
    );
    expect(wrapper.find("ul")).toHaveLength(1);
  });
  test("should render ul with 2 li", function() {
    const wrapper = Enzyme.shallow(<TickerList tickers={mockTickers} />);

    expect(wrapper.find("li")).toHaveLength(2);
  });
});
