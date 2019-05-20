import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, HashRouter  } from 'react-router-dom';

import TodosPage from './todos-page';
import Header from './header';
// import All from './All';
// import Active from './Active';
// import Completed from './Completed';
// import Archived from './Archived';

/**
 * Prop Types
 * @private
 */
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

/**
 * App component
 * @returns {ReactElement}
 */
const App = ({ children }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'app';

  return (
    <HashRouter>
      <div className={baseCls}>
        <Header />
        <Switch>
          <Route exact path="/" component={TodosPage} />
          <Route exact path="/active" render={() => <TodosPage filterBy="active" />} />
          <Route exact path="/completed" render={() => <TodosPage filterBy="completed" />} />
          <Route exact path="/archived" render={() => <TodosPage filterBy="archived" />} />
        </Switch>
      </div>
    </HashRouter>
  );
};

App.propTypes = propTypes;

export default App;
