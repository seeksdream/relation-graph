import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../tailwind.css';
import {NotFound} from "./error-page-404";
import {DemosIndex} from "./demos-index";

export const OnlineDemosIndex:React.FC = () => {

  return (
    <Router>
      <Switch>
        <Route path="/react-demos" component={DemosIndex} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
