import React, { useState } from 'react';
// login stubs an API call
import { login } from './utils';

export default function LoginPlain() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    await login({ username, password });

    setIsLoading(false);

    console.log(username, password);
  };

  return (
    <div className="App">
      <div className="login-container">
        <form className="form" onSubmit={onSubmit}>
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
          <button className="submit" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
