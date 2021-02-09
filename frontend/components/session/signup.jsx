import React from 'react';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    }

    this.clickSubmit = this.clickSubmit.bind(this);
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value })
  }

  clickSubmit() {
    this.props.createNewUser(this.state)
  }


  render() {
    return (
      <div className="session-form">
        <h2>SignUp</h2>
        <form onSubmit={this.clickSubmit}>
          <label>Email
          <input type="text" value={this.state.email} onChange={this.update('email')} />
          </label>

          <label>Username
          <input type="text" value={this.state.username} onChange={this.update('username')} />
          </label>

          <label>Password
          <input type="password" value={this.state.password} onChange={this.update('password')} />
          </label>

          <input type="submit" value='Signup'/>
        </form>
      </div>
    )
  }


}

export default Signup;




