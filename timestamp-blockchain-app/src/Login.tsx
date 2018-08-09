import * as React from 'react';

class Login extends React.Component {
  public render() {
    return (
      <div className="Login">
        <form>
            <input type="text"/>
            <input type="pasword"/>
            <button type="submit">Login</button>
        </form>   
      </div>
    );
  }
}

export default Login;
