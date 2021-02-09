import React from 'react';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

    this.clickSubmit = this.clickSubmit.bind(this);
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value })
  }

  clickSubmit() {
    this.props.login(this.state)
  }


  render() {
    return (
      <div className="session-form">
        <h2>Login</h2>
        <form onSubmit={this.clickSubmit}>
          <label>Username
          <input type="text" value={this.state.username} onChange={this.update('username')} />
          </label>

          <label>Password
          <input type="password" value={this.state.password} onChange={this.update('password')} />
          </label>

          <input type="submit" value='Sign in'/>
        </form>
      </div>
    )
  }


}

export default Login;




