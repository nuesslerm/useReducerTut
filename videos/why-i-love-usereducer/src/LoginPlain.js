import React from 'react';

export default function LoginPlain() {
  const onSubmit = async (e) => {
    e.preventDefault();

    alert('todo');
  };

  return (
    <div className="App">
      <div className="login-container">
        <form className="form" onSubmit={onSubmit}>
          <p>Please Login!</p>
          <input type="text" placeholder="username" />
          <input
            type="password"
            placeholder="password"
            autoComplete="new-password"
          />
          <button className="submit" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
