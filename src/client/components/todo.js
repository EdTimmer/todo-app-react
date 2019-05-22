import PropTypes from 'prop-types';
import React from 'react';
import TodoLink from './todo-link';
import ArchiveButton from './archive-button';
import ArchivedNotice from './archived-notice';
import ReviveButton from './revive-button';

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
  status: 'active',
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
    + (filtered ? ' todo--filtered' : '');

  return (
    <div className={todoContainerCls}>
      <div className={todoCls}>
        <TodoLink text={text} onClick={onClickTodo} status={status} />
      </div>
      
      <ArchiveButton status={status} archive={archive} onClickArchive={onClickArchive} />
        
      <div>
        <ArchivedNotice status={status} archive={archive} />
        <ReviveButton archive={archive} onClickRevive={onClickRevive} />
        <span style={{marginLeft: '5rem', color: 'red'}} onClick={onClickDelete}>&#10060;</span>
      </div>
    </div>
  );
};

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
