import React, { useReducer } from 'react';
// login stubs an API call
import { login } from './utils';

function loginReducer(state, action) {
  switch (action.type) {
    case 'tryLogin':
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case 'success':
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        error: '',
      };
    case 'error':
      return {
        ...state,
        error: 'Incorrect username or password!',
        isLoading: false,
        username: '',
        password: '',
      };
    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        password: '',
      };
    case 'updateField':
      return {
        ...state,
        [action.fieldName]: action.value,
      };
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

export default function LoginPlain() {
  const [state, dispatch] = useReducer(loginReducer, initialState);

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
