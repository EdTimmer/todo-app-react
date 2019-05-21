import PropTypes from 'prop-types';
import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: PropTypes.bool,
  onClickDelete: PropTypes.func,
  onClickTodo: PropTypes.func,
  status: PropTypes.string,
  text: PropTypes.string,
  // checked: ''
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickArchive: noop,
  onClickTodo: noop,
  status: '',
  text: '',
  archive: false,
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, onClickDelete, onClickTodo, onClickArchive, status, text, archive }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo';

  const todoCls = baseCls
    + (status === 'complete' ? ' todo--status-complete' : '')
    + (filtered ? ' todo--filtered' : '');

  const containerCls = 'todo-container';
  const todoContainerCls = containerCls
    // + (status === 'complete' ? ' todo--status-complete' : '')
    + (filtered ? ' todo--filtered' : '');


  return (
    <div className={todoContainerCls}>
      <div className={todoCls}>
        <TodoLink text={text} onClick={onClickTodo} status={status} />
      </div>     
      
      {
        archive ? <span className="archived-status">archived</span> : <Button text="Archive" onClick={onClickArchive} />
      }
      <span style={{marginLeft: '5rem'}} onClick={onClickDelete}>&#10060;</span>
    </div>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
