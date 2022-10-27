import React from "react";

export default class ScrollRef extends React.Component {
  constructor(props) {
    super(props);
    this.bottom = React.createRef();
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.bottom.current.scrollIntoView({ behavior: "auto" });
    }, 0);
  };

  render() {
    return <div ref={this.bottom} />;
  }
}
