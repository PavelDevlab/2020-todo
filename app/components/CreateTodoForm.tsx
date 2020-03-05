
import React, { Reducer, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import {TaskItemRequest} from 'app/stores/TasksStore';

const createTodoDefaultState = {
  opened: false,
  fields: {
    info: ''
  },
  errors: {
    info: null
  }
};

interface Action {
  type: string,
  payload?: any
};

const createTodoReducer:Reducer<typeof createTodoDefaultState, Action> = (
  state=createTodoDefaultState,
  {type, payload}
) => {
  switch (type) {
    case 'FIELD':
      return {
        ...state,
        fileds: {
          ...state.fields,
          [payload.name]: payload.value
        },
      };
    case 'ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.name]: payload.value
        },
      };
    case 'OPEN':
      return {
        ...state,
        opened: true
      };
    case 'ESCAPE':
      return createTodoDefaultState;
    default:
      return state;
  }
};


const propTypes = {
  onSubmit: PropTypes.func.isRequired
};

type TodosProps = {
  onSubmit: (task:TaskItemRequest) => void
};

const TodoForm = ({onSubmit}:TodosProps):JSX.Element => {
  const [state, dispatch] = useReducer(createTodoReducer, createTodoDefaultState);
  const validate = useCallback(() => {
    let isValid = true;
    if (!state.fields.info) {
      isValid = false;
      dispatch({
        type: 'error',
        payload: {
          name: 'info',
          value: 'Required'
        }
      });
    }
    return isValid;
  }, [state]);

  return (
    <div>
      {!state.opened &&
        <button onClick={():void => dispatch({type: "OPEN"})}>
          Create
        </button>
      }
      {state.opened &&
        <>
          <h3>Create a task</h3>
          <div>
            <form onSubmit={():void => {
              if (validate()) {
                dispatch({type:"ESCAPE"});
                onSubmit({
                  info: state.fields.info,
                  done: false
                });
              }
            }}>
              <label>
                Task:
                <input type="text"
                       name="info"
                       value={state.fields.info}
                />
                {state.errors.info &&
                  <div>{state.errors.info}</div>
                }
              </label>
              <button type="submit">
                Create
              </button>
              <button type="button"
                      onClick={() => dispatch({type:"ESCAPE"})}>
                Cancel
              </button>
            </form>
          </div>
        </>
      }
    </div>
  );
};

TodoForm.propTypes = propTypes;

export default TodoForm;