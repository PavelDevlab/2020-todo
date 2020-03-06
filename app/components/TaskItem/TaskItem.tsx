
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {TaskItem} from 'app/stores/TasksStore';
import { observer } from "mobx-react";

import classNames from 'classnames';
import {compose} from 'app/services/utils';
import withStyles from 'isomorphic-style-loader/withStyles';
import formCSS from '../common/form.scss';
import taskItemCSS from './taskItem.scss';

const propTypes = {
  task: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

type TaskItemProps = {
  task: TaskItem,
  onDelete: (task: TaskItem) => void,
  onDoneChange: (task: TaskItem, done: boolean) => void
};

const TaskItemCompoennt = ({task, onDelete, onDoneChange}: TaskItemProps):JSX.Element => {
  const handleDelete = useCallback(() => {
    onDelete(task);
  }, [task]);

  const handleDoneChange = useCallback((event) => {
    onDoneChange(task, event.target.checked);
  }, [task]);

  return (
    <li className={taskItemCSS['task']}>
      <div className={taskItemCSS['done']}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={handleDoneChange}
        />
      </div>
      <div className={taskItemCSS['info']}>
        {task.info}
      </div>
      <div className={taskItemCSS['delete']}>
        <button className={classNames(formCSS['btn'], formCSS['_secondary'], formCSS['_mini'])} onClick={handleDelete}>X</button>
      </div>
    </li>
  );
};

TaskItemCompoennt.propTypes = propTypes;

export default compose(
  observer,
  withStyles(taskItemCSS, formCSS)
)(TaskItemCompoennt);