
import React, { useCallback } from 'react';
import { inject, observer } from "mobx-react";
import {compose} from 'app/services/utils';
import {TasksStore, TaskItemRequest} from 'app/stores/TasksStore';
import TodoForm from 'components/CreateTodoForm';
import TaskItemComponent from 'components/TaskItemComponent';

import PropTypes from "prop-types";

import classNames from 'classnames';
import taskListCSS from './taskList.scss';
import contentCSS from 'app/components/common/content.scss';
import withStyles from 'isomorphic-style-loader/withStyles';

const propTypes = {
  tasksStore: PropTypes.object.isRequired
};

type TasksProps = {
  tasksStore: TasksStore
};

const useTodosHandlers = (tasksStore:TasksStore) => {
  return {
    filterByDone: useCallback(
      ():void => {tasksStore.isDoneFilter === true ? tasksStore.clearFilters() : tasksStore.setIsDone(true);},
      []
    ),
    filterByUndone: useCallback(
      ():void => {tasksStore.isDoneFilter === false ? tasksStore.clearFilters() : tasksStore.setIsDone(false);},
      []
    ),
    deleteTask: useCallback(
      (task):void => {tasksStore.deleteTask(task.id);},
      []
    ),
    onCreateFormSubmit: useCallback(
      (task:TaskItemRequest):void => {tasksStore.createTask(task);},
      []
    ),
    onDoneChange: useCallback(
      (task, done):void => {tasksStore.updateTask({
        ...task,
        done
      });},
      []
    ),
  };
};

const Tasks = ({tasksStore}:TasksProps):JSX.Element => {

  const handler = useTodosHandlers(tasksStore); // useTodosHandlers(tasksStore);

  return (
    <div className={classNames(taskListCSS['sheet'], taskListCSS['tasks'])}>
      <h2>Tasks</h2>
      <label>
        <input type="checkbox"
               checked={tasksStore.isDoneFilter === true}
               onChange={handler.filterByDone}
        />
        Filter by done
      </label>
      <br />
      <label>
        <input type="checkbox"
               checked={tasksStore.isDoneFilter === false}
               onChange={handler.filterByUndone}
        />
        Filter by undone
      </label>
      <ul>
        {tasksStore.filtedTasks.map((task) =>{
          return (
            <TaskItemComponent
              key={task.id}
              onDoneChange={handler.onDoneChange}
              task={task}
              onDelete={handler.deleteTask}
            />
          );
        })}
      </ul>
      <div className={contentCSS['hr']}></div>
      <TodoForm
        onSubmit={handler.onCreateFormSubmit}
      />
    </div>
  );
};

Tasks.propTypes = propTypes;

export default compose(
  withStyles(taskListCSS, contentCSS),
  inject('tasksStore'),
  observer,
)(Tasks);