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
const Todo = ({ filtered, onClickDelete, onClickTodo, onClickArchive, onClickRevive, status, text, archive }) => {
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
        status === 'complete' && !archive ? <Button text="Archive" onClick={onClickArchive} /> : null
      }
      
      {
        archive ? (
          <span>
            <span className="archived-status">archived</span>            
          </span>
          ) : null
      }
      <div>
        {
          archive ? (
            <Button text="Revive" onClick={onClickRevive} />
            ) : null
        }        
        <span style={{marginLeft: '5rem', color: 'red'}} onClick={onClickDelete}>&#10060;</span>
      </div>      
    </div>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
