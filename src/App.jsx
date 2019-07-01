import React, { Component } from "react";
import "./App.css";

import ReportDashboard from "./containers/ReportDashboard";
import Header from "./containers/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ReportDashboard />
      </div>
    );
  }
}

export default App;
