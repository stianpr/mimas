import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Main from './pages/main';
import Sensors from './pages/sensors';
import Snapshots from './pages/snapshots';

import '../sass/app.scss';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Sensors} />
      <Route path="snapshots" component={Snapshots} />
    </Route>
  </Router>
), document.getElementById('app'))
