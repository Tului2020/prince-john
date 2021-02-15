import React from 'react';



class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.removeErrors = this.removeErrors.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.processForm(this.state)
  }

  demoLogin(e) {
    e.preventDefault()
    this.props.processForm({
      username: "demolicious@demo.com",
      password: "123456",
    })
  }

  removeErrors() {
    // e.preventDefault();
    // debugger
    // console.log(this.props)
    // debugger
    return this.props.clearErrors()
  }


    
  componentWillUnmount() {
    // debugger
    this.props.deleteErrors()
  }


  render() {

    const displayErrors = (
      <ul>
          {Object.values(this.props.errors).map((error, i) => {
            return (
              <li key={i}>
                {error}
              </li>
            )
          })}
      </ul>
    )


    // This function simplifies different types of inputs i.e. username, password, email
    const fieldInput = (inputDisp, inputDB = null, inputType = 'text') => {
      if (!inputDB) {
        inputDB = inputDisp;
      }

      return (
        <div >
          <label id="login-page-input">
            {inputDisp}
            <br /><br />
            {/* <input type={inputDisp.charAt(0).toUpperCase() + inputDisp.slice(1)} className="login-page-input-field" onChange={this.update(inputDB)} /> */}
            <input type={inputType} className="login-page-input-field" onChange={this.update(inputDB)} />
          </label>
        </div>
      )
    }

    // using ternary logic to define form
    let form = (
      <div className="login-page">
        <div>
          <img id="login-page-left" src="https://cdn.robinhood.com/assets/generated_assets/632fcb3e7ed928b2a960f3e003d10b44.jpg" />
        </div>
        <div id="login-page-right">

          <div id="login-page-right-top">

            <div className="welcome">
              Welcome to PrinceJohn
            </div>

            {fieldInput('Username or Email', 'username')}

            {fieldInput('Password', 'password', 'password')}


          </div>
            <div id="session-errors">
              {displayErrors}
            </div>
          <div id="login-demo">
            <button className="login-page-login" >{this.props.formType}</button>
            <button className="login-page-login" onClick={this.demoLogin}>Demo Login</button>
          </div>
          {/* <button onClick={this.removeErrors}>Remove Errors</button> */}
        </div>
        
      </div>)



    return (
      <div className='session-form'>
        <form onSubmit={this.handleSubmit}>
          {form}
        </form>
      </div>
    )
  }
}

export default LoginForm;