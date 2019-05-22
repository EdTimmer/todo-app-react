import PropTypes from 'prop-types';
import React from 'react';
import { api } from '../helpers/api';
import Navbar from './navbar';
import TodoForm from './todo-form';
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
    this.archiveAllCompleted = this.archiveAllCompleted.bind(this);
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
  }

  archiveAllCompleted() {
    let customUrl = 'http://localhost:3000/todos/archiveall';
    api('PUT', null, this.updateTodos, customUrl);
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className={this.baseCls}>

        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} archiveAllCompleted={this.archiveAllCompleted} />
        
        <Summary num={this.state.todos.filter(todo => todo.status === 'active').length} completeAll={this.completeAll} />
        <TodoForm onSubmit={this.addTodo} />

        <Todos
          filterBy={this.props.filterBy}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
        />
      </div>
    );
  }
}

export default TodosPage;
