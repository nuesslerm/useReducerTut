import React, { useState } from 'react';
// login stubs an API call
import { login } from './utils';

export default function LoginPlain() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      await login({ username, password });
      setIsLoggedIn(true);
      setError('');
    } catch (err) {
      // do nothing for now
      setError('Incorrect username or password!');
    }

    setIsLoading(false);

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
                setUsername('');
                setPassword('');
                setIsLoggedIn(false);
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
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
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
