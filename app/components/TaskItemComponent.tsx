
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
  onDelete: (task: TaskItem) => void
};

const TaskItemComponent = ({task, onDelete}: TaskItemProps):JSX.Element => {
  const handleDelete = useCallback(() => {
    onDelete(task);
  }, []);

  return (
    <li key={task.id}>
      {task.info}
      <button onClick={handleDelete}>X</button>
    </li>
  );
};

TaskItemComponent.propTypes = propTypes;

export default observer(TaskItemComponent);