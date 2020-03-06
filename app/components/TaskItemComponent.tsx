
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {TaskItem} from 'app/stores/TasksStore';
import { observer } from "mobx-react";

const propTypes = {
  task: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

type TaskItemProps = {
  task: TaskItem,
  onDelete: (task: TaskItem) => void,
  onDoneChange: (task: TaskItem, done: boolean) => void
};

const TaskItemComponent = ({task, onDelete, onDoneChange}: TaskItemProps):JSX.Element => {
  const handleDelete = useCallback(() => {
    onDelete(task);
  }, [task]);

  const handleDoneChange = useCallback((event) => {
    onDoneChange(task, event.target.checked);
  }, [task]);

  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleDoneChange}
      />{' '}
      {task.info}
      <button onClick={handleDelete}>X</button>
    </li>
  );
};

TaskItemComponent.propTypes = propTypes;

export default observer(TaskItemComponent);