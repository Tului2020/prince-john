import React from 'react';
import { Redirect } from 'react-router'


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: '',
      password: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.processForm(this.state)
  }


  render() {
    let usernameInput = (
      <label>Username
        <input type="text" value={this.state.username} onChange={this.update('username')}/>
      </label>)

    let emailInput = (
      <label>Email
        <input type="text" value={this.state.email} onChange={this.update('email')}/>
      </label>)

    let passwordInput = (
      <label>Password
        <input type="password" value={this.state.password} onChange={this.update('password')}/>
      </label>)

    // using ternary logic to define form
    let form = (this.props.formType == 'Log In') ? 
      (
        <div className="login-page">
          <div>
            <img id="login-picture" src="https://cdn.robinhood.com/assets/generated_assets/632fcb3e7ed928b2a960f3e003d10b44.jpg"/>
          </div>
          <div>
            <h2>Welcome to PrinceJohn</h2>
            {usernameInput}{passwordInput}
          </div>
          <button>{this.props.formType}</button>
        </div>)
      : 
      (<div>{emailInput}{usernameInput}{passwordInput}</div>)

    

    return (
      <div className='session-form'>
        <form onSubmit={this.handleSubmit}>
          {form}
          
        </form>
      </div>
    )
  }
}

export default SessionForm;