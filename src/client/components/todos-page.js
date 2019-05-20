import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route, Switch, HashRouter  } from 'react-router-dom';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';
import Summary from './summary';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page'

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: PropTypes.object,
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filterBy: null,
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.completeAll = this.completeAll.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState({
      todos: [...json],
    });
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.setState({ filterBy });
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    this.setState({ todos });
  }

  completeAll() {
    api('PUT', null, this.updateTodos);
    let newTodos = this.state.todos;
    newTodos.forEach(todo => {
      todo.status = 'complete';
    })
    this.setState({ todos: newTodos })
    
  }
  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    console.log('this.state.filterBy', this.state.filterBy)
    return (
     
      <div className={this.baseCls}>
        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} />
        <Summary num={this.state.todos.filter(todo => todo.status === 'active').length} completeAll={this.completeAll} />
        <TodoForm onSubmit={this.addTodo} />

        <Todos
          // filterBy={this.state.filterBy}
          filterBy={this.props.filterBy}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
        />
        
          {/*<Switch>
            <Route
              exact
              path="/"
              render={({history}) => <Todos history={history} filterBy={this.state.filterBy} todos={this.state.todos} updateTodos={this.updateTodos} /> } />

            <Route
              exact
              path="/active"
              render={({history}) => <Todos history={history} filterBy="active" todos={this.state.todos} updateTodos={this.updateTodos} /> } />
          </Switch>*/}
        
      </div>
    
    );
  }
}

export default TodosPage;
