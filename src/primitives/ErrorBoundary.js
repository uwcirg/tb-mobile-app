import React from "react"
import Login from "../components/Login"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.props.assembly.currentPage = Login
    console.log(error, info);
  }

  render() {
    return (
      this.state.error
      ? <div>
          {JSON.stringify(this.state.error)}
        </div>
      : this.props.children
    )
  }
}

export default ErrorBoundary
