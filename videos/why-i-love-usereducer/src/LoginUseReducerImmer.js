import React /* , { useReducer } */ from 'react';
// import produce from 'immer';
import { useImmerReducer } from 'use-immer';
// login stubs an API call
import { login } from './utils';

function loginReducer(draft, action) {
  switch (action.type) {
    case 'tryLogin':
      draft.isLoading = true;
      draft.error = '';
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
    case 'updateField':
      draft[action.fieldName] = action.value;
      return;
    default:
      throw new Error('Unknown action type');
  }
}

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
};

// const curriedLoginReducer = produce(loginReducer);

export default function LoginPlain() {
  // const [state, dispatch] = useReducer(curriedLoginReducer, initialState);
  const [state, dispatch] = useImmerReducer(loginReducer, initialState);

  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'tryLogin' });

    try {
      await login({ username, password });
      dispatch({ type: 'success' });
    } catch (err) {
      dispatch({ type: 'error' });
    }
    console.log(username, password);
  };

  return (
    <div className="App">
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
                  value: e.currentTarget.value,
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
                  value: e.currentTarget.value,
                })
              }
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
