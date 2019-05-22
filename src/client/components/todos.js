import PropTypes from 'prop-types';
import React from 'react';

import { api } from '../helpers/api';
import Todo from './todo';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object),
  updateTodos: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  todos: [],
  updateTodos: noop,
};

/**
 * Todos component
 * @returns {ReactElement}
 */
const Todos = ({ filterBy, todos, updateTodos }) => {

  /**
   * Base CSS class
   */
  const baseCls = 'todos';

  /**
   * Callback function to delete todo from todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  const deleteTodo = json => {
    console.log('json in deleteTodo is: ', typeof json);
    const index = todos.findIndex(todo => {
      return todo.id === json.todo[0].id;
    });

    updateTodos(
      [
        ...todos.slice(0, index),
        ...todos.slice(index + 1),
      ]
    );
  }

  /**
   * Callback function to replace todo with results of fetching the todo PUT endpoint
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  const putTodo = json => {

    const index = todos.findIndex(todo => {
      return todo.id === json.todo.id;
    });

    updateTodos(
      [
        ...todos.slice(0, index),
        json.todo,
        ...todos.slice(index + 1),
      ]
    );
  }

  /**
   * Click handler for clicking on delete button
   * Deletes todo
   *
   * @param {object} todo - Todo object
   */
  const onClickDelete = todo => {
    // api('DELETE', JSON.stringify(todo), deleteTodo);
    api('DELETE', todo, deleteTodo);
  };

  const onClickArchive = todo => {
    let currentArchive;
    let currentStatus;
    const propsTodo = todos.forEach(propsTodo => {
      if (propsTodo.id === todo.id) {
        currentArchive = propsTodo.archive;
        currentStatus = propsTodo.status;
      }
    })
    // api('PUT', JSON.stringify(todo), archiveTodo);
    if (currentStatus === 'complete' && !currentArchive) {
      const newTodo = Object.assign({}, todo);
      newTodo.archive = true;
      api('PUT', newTodo, putTodo);
    }    
  };

  const onClickRevive = todo => {
    const newTodo = Object.assign({}, todo);
    newTodo.archive = true;
    newTodo.status = 'active';
    let customUrl = 'http://localhost:3000/todos/revive';
    api('PUT', newTodo, putTodo, customUrl);
  };

  /**
   * Click handler for clicking on the todo
   * Toggles status state of Todo
   *
   * @param {object} todo - Todo object
   */
  const onClickTodo = todo => {
    let currentArchive;
    let currentStatus;
    const propsTodo = todos.forEach(propsTodo => {
      if (propsTodo.id === todo.id) {
        currentArchive = propsTodo.archive;
        currentStatus = propsTodo.status;
      }
    })    

    if (!currentArchive) {
      const newTodo = Object.assign({}, todo);
      newTodo.status = todo.status === 'complete' ? 'active' : 'complete';
      newTodo.archive = false;
  
      api('PUT', newTodo, putTodo);
    }
  }

  /**
   * Renders All Todos
   *
   * @returns {Array} - Returns an array of Todo React Elements
   */
  const renderTodos = () => {
    if (!Array.isArray(todos)) {
      return null;
    }

    return todos.map(todo => {
      
      let filtered;
      switch (filterBy) {
        case 'active':
          filtered = todo.status === 'complete';
          break;
        case 'completed':
          filtered = !todo.archive && todo.status === 'complete' ? false : true;
          break;
        case 'archived':
          filtered = !todo.archive;
          break;
        default:
          filtered = false;
      }

      return (
        <Todo
          key={todo.id}
          filtered={filtered}
          onClickDelete={onClickDelete.bind(this, todo)}
          onClickArchive={onClickArchive.bind(this, todo)}
          onClickTodo={onClickTodo.bind(this, todo)}
          onClickRevive={onClickRevive.bind(this, todo)}
          status={todo.status}
          text={todo.text}
          archive={todo.archive}
        />
      );
    })
  }

  return (
    <ul className={baseCls}>
      {renderTodos()}
    </ul>
  )
};

Todos.propTypes = propTypes;
Todos.defaultProps = defaultProps;

export default Todos;
