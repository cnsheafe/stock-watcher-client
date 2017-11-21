import * as React from "react";

interface TickerProps {
  symbol: string;
  price: number;
}
export class TickerCard extends React.Component<TickerProps> {
  render() {
    return(
    <div className="ticker-card">
      <span>{this.props.symbol}</span>
      <span>{this.props.price}</span>
    </div>);
  }
}
