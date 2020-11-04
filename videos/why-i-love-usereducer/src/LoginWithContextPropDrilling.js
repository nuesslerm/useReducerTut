import React from 'react';
import { useImmerReducer } from 'use-immer';
import { login } from './utils';

function loginReducer(draft, action) {
  switch (action.type) {
    case 'updateField':
      draft[action.fieldName] = action.payload;
      return;
    case 'tryLogin':
      draft.error = '';
      draft.isLoading = true;
      return;
    case 'success':
      draft.isLoggedIn = true;
      draft.isLoading = false;
      draft.error = '';
      return;
    case 'error':
      draft.error = 'Incorrect username or password!';
      draft.isLoading = false;
      draft.username = '';
      draft.password = '';
      return;
    case 'logout':
      draft.isLoggedIn = false;
      draft.username = '';
      draft.password = '';
      return;
    case 'toggleTodoCompleted':
      const todo = draft.todos.find((item) => item.title === action.payload);
      todo.completed = !todo.completed;
      return;
    default:
      throw new Error('Unknown action type');
  }
}

const todos = [
  {
    title: 'Get milk',
    completed: true,
  },
  {
    title: 'Make YouTube video',
    completed: false,
  },
  {
    title: 'Write blog post',
    completed: false,
  },
];

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
  todos,
};

function TodoPage(props) {
  const { todos, dispatch, isLoggedIn } = props;

  return (
    <div className="todoContainer">
      <h2>Todos</h2>
      {todos.map((item) => (
        <TodoItem
          key={item.title}
          {...item}
          dispatch={dispatch}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
}

function TodoItem(props) {
  const { title, completed, dispatch, isLoggedIn } = props;

  return (
    <div className="todoItem">
      <p>{title}</p>
      <div>
        <input
          type="checkbox"
          checked={completed}
          onClick={() => {
            if (!isLoggedIn) {
              alert('Please login to click this!');
            }
          }}
          onChange={() => {
            if (isLoggedIn) {
              dispatch({ type: 'toggleTodoCompleted', payload: title });
            }
          }}
        />
      </div>
    </div>
  );
}

export default function LoginUseContext() {
  const [state, dispatch] = useImmerReducer(loginReducer, initialState);

  const { username, password, isLoading, error, isLoggedIn, todos } = state;

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'tryLogin' });

    try {
      await login({ username, password });
      dispatch({ type: 'success' });
    } catch (err) {
      dispatch({ type: 'error' });
    }
  };

  return (
    <div className="App useContext">
      <div className="login-container">
        {isLoggedIn ? (
          <div>
            <h1>Hello {username}!</h1>
            <button
              onClick={() => {
                dispatch({ type: 'logout' });
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: 'updateField',
                  fieldName: 'username',
                  payload: e.currentTarget.value,
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                dispatch({
                  type: 'updateField',
                  fieldName: 'password',
                  payload: e.currentTarget.value,
                })
              }
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        )}
      </div>

      <TodoPage todos={todos} dispatch={dispatch} isLoggedIn={isLoggedIn} />
    </div>
  );
}
