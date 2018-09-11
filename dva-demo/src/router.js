import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Test from './routes/test';
import UpLoad from './routes/UpLoad';

function RouterConfig({ history }) {
  return (
    <Router history={ history }>
      <Switch>
        <Route path="/" exact component={ IndexPage } />
        <Route path="/test" exact component={ Test } />
        <Route path="/upload" exact component={ UpLoad } />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
