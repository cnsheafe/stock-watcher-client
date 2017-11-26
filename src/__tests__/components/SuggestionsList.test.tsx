import * as React from "react";
import { SuggestionsList, SearchProps } from "../../components/SuggestionsList";

import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Graph, Company } from "../../store/schema";
import { Ticker } from "../../actions/Tickers";

(Enzyme as any).configure({ adapter: new Adapter() });

describe("SuggestionsList", function() {
  const mockResults: Company[] = [
    {
      symbol: "msft",
      name: "Microsoft"
    },
    {
      symbol: "amd",
      name: "AMD"
    }
  ];
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
  test("should render a ul with 2 list items", function() {
    const wrapper = Enzyme.shallow(
      <SuggestionsList
        searchResults={mockResults}
        onTickers={true}
        tickers={mockTickers}
      />
    );
    expect(wrapper.find('ul')).toHaveLength(1);
    expect(wrapper.find('li')).toHaveLength(2);
  });
});
