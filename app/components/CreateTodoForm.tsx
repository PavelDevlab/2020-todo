
import React, {
  Reducer,
  useReducer,
  useCallback,
  SyntheticEvent,
  Dispatch,
  useRef,
  MutableRefObject
} from 'react';
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

interface CreateTodoFormRefs {
  firstInput: MutableRefObject<null|HTMLInputElement>
}

interface Action {
  type: string,
  payload?: any
};

const createTodoReducer:Reducer<typeof createTodoDefaultState, Action> = (
  state=createTodoDefaultState,
  {type, payload}
):typeof createTodoDefaultState => {
  switch (type) {
    case 'FIELD':
      return {
        ...state,
        fields: {
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
    case 'CLEAR':
      return {
        ...createTodoDefaultState,
        opened: state.opened
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

const useTodoFormHandler = (
  state: typeof createTodoDefaultState,
  dispatch:Dispatch<Action>,
  {onSubmit}:TodosProps,
  {firstInput}:CreateTodoFormRefs
) => {
  const validate = useCallback(() => {
    let isValid = true;
    if (!state.fields.info) {
      isValid = false;
      dispatch({
        type: 'ERROR',
        payload: {
          name: 'info',
          value: 'Required'
        }
      });
    }
    return isValid;
  }, [state, dispatch]);

  const submit = useCallback((event:SyntheticEvent):void =>  {
    event.preventDefault();
    if (validate()) {
      dispatch({type:"CLEAR"});
      onSubmit({
        info: state.fields.info,
        done: false
      });
      if (firstInput.current !== null) {
        firstInput.current.focus();
      }
    }
  }, [firstInput, validate, dispatch]);

  const open = useCallback(():void => dispatch({type: "OPEN"}), [dispatch]);

  const escape = useCallback(() => dispatch({type:"ESCAPE"}), [dispatch]);

  const fieldChange = useCallback(
    ({target}) => {dispatch({type:"FIELD", payload: {name: target.name, value: target.value}});},
    [dispatch]
  );

  return {
    submit,
    validate,
    open,
    escape,
    fieldChange
  };
};

const TodoForm = (props:TodosProps):JSX.Element => {
  const [state, dispatch] = useReducer(createTodoReducer, createTodoDefaultState);
  const firstInput = useRef(null);
  const handler = useTodoFormHandler(state, dispatch, props, {firstInput});

  return (
    <div>
      {!state.opened &&
        <button onClick={handler.open}>
          Create
        </button>
      }
      {state.opened &&
        <>
          <h3>Create a task</h3>
          <div>
            <form onSubmit={handler.submit}>
              <label>
                Task:
                <input type="text"
                       ref={firstInput}
                       name="info"
                       onChange={handler.fieldChange}
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
                      onClick={handler.escape}>
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