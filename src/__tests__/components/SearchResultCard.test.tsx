import * as React from "react";
import SearchResultCard from "../../components/SearchResultCard";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Ticker } from "../../action-creators/TickerAction";
import { Graph, Company } from "../../store/schema";

(Enzyme as any).configure({ adapter: new Adapter() });

describe("SearchResultCard", function() {
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
  const mockCompany = {
    symbol: "msft",
    name: "Microsoft"
  };

  test("should render a div with a i and p", function() {
    const wrapper = Enzyme.render(
      <SearchResultCard
        tickers={mockTickers}
        company={mockCompany}
        onTickers={true}
      />
    );
    expect(wrapper.first().hasClass('suggestion-card')).toBe(true);
    expect(wrapper.find('i')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(1);
  });
});
