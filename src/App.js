import React from "react";
import { Link, Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Top } from "./pages/Top";
import { BarChartPage } from "./pages/BarChart";
import { LineChartPage } from "./pages/LineChart";
import { ScatterPlotPage } from "./pages/ScatterPlot";
import { DensityPlotPage } from "./pages/DensityPlot";
import { ChordDiagramPage } from "./pages/ChordDiagram";
import { NodeLinkDiagramPage } from "./pages/NodeLinkDiagram";
import { ChoroplethMapPage } from "./pages/ChoroplethMap";

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <nav className="navbar is-info">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <h1>Data Visualization with React and D3</h1>
          </Link>
        </div>
      </nav>
      <section className="section">
        <div className="container">
          <Switch>
            <Route path="/" component={Top} exact />
            <Route path="/bar-chart" component={BarChartPage} />
            <Route path="/line-chart" component={LineChartPage} />
            <Route path="/scatter-plot" component={ScatterPlotPage} />
            <Route path="/density-plot" component={DensityPlotPage} />
            <Route path="/chord-diagram" component={ChordDiagramPage} />
            <Route path="/node-link-diagram" component={NodeLinkDiagramPage} />
            <Route path="/choropleth-map" component={ChoroplethMapPage} />
          </Switch>
        </div>
      </section>
    </Router>
  );
};

export default App;
