import React from 'react';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
    this.update = this.update.bind(this);

  }

  update(field){
    return (e) => {
      this.setState({ [field]: e.target.value })
    } 
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createNewUser(this.state)
      // .then(() => this.props.history.push())

  }


  render(){


    return (
      <div className="session-form">
        <h2>SignUp</h2>
        <form >
        <label>Email
          <input type="text" value={this.state.email} onChange={this.update('email')}/>
        </label>

        <label>Username
          <input type="text" value={this.state.username} onChange={this.update('username')}/>
        </label>

        <label>Password
          <input type="password" value={this.state.password} onChange={this.update('password')}/>
        </label>

        <button onClick={this.handleSubmit}>Sign Up</button>
        </form>
      </div>
    )
  }


}

export default Signup;




