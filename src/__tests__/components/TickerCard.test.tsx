import * as React from "react";
// import { SuggestionsList, SearchProps } from "../../components/SuggestionsList";
import {TickerCard} from "../../components/TickerCard";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Graph, Company } from "../../store/schema";
import { Ticker } from "../../actions/Tickers";

(Enzyme as any).configure({ adapter: new Adapter() });

class MockTickerCard extends TickerCard {
  componentDidMount() {
    // Do Nothing!
  }
  componentDidUpdate() {
    // Do Nothing!
  }
}

describe("TickerCard", function() {
  test("should render with a div that has 5 spans and a i", function() {
    const wrapper = Enzyme.shallow(<MockTickerCard symbol={"msft"}
    price={10.00} />);
    expect(wrapper.find("div").first().hasClass('ticker-card')).toBe(true);
    expect(wrapper.find("span")).toHaveLength(5);
    expect(wrapper.find("i")).toHaveLength(1);

  });
})