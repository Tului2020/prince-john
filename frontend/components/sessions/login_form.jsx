import React from 'react';



class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.errors);
    // this.props.errors = 'hdklajlka';
    this.state = {
      username: "",
      password: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  update(field) {
    // console.log(this.state)
    return (e) => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    
    this.props.processForm(this.state)
    // console.log(this.props.errors)
  }

  demoLogin(e) {
    e.preventDefault()
    this.props.processForm({
      username: "demolicious@demo.com",
      password: "123456",
    })
  }



    
  


  render() {
    // const displayErrors = (
    //   <ul>
    //     <li>
    //       {Object.values(this.props.errors)[0]}
    //     </li>
    //   </ul>
    // )


    const displayErrors = (
      <ul>
          {Object.values(this.props.errors).map(error => {
            return (
              <li>
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
            <input type={inputDisp.charAt(0).toUpperCase() + inputDisp.slice(1)} id="login-page-input-field" onChange={this.update(inputDB)} />
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
            <button id="login-page-login" >{this.props.formType}</button>
            <button id="login-page-login" onClick={this.demoLogin}>Demo Login</button>
          </div>
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