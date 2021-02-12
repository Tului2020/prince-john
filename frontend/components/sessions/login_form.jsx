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
  }

  update(field) {
    // console.log(this.state)
    return (e) => {
      this.setState({ [field]: e.target.value })}
  }

  handleSubmit(e) {
    e.preventDefault()
    // console.log(this.state)
    this.props.processForm(this.state)
  }

  demoLogin(e) {
    e.preventDefault()
    this.props.processForm({
      username: "demo",
      password: "123456",
    })
  }


  render() {
    // This function simplifies different types of inputs i.e. username, password, email
    const fieldInput = (inputDisp, inputDB=null, inputType='text') => {
      if (!inputDB){
        inputDB = inputDisp;
      }

      return (
        <div >
          <label id="login-page-input">
            {inputDisp}
            <br/><br/>
            <input type={inputDisp.charAt(0).toUpperCase() + inputDisp.slice(1)} id="signup-page-input-field" onChange={this.update(inputDB)}/>
          </label>
        </div>
      )
    }

    // using ternary logic to define form
    let form =
      (
        <div className="login-page">
          <div>
            <img id="login-page-left" src="https://cdn.robinhood.com/assets/generated_assets/632fcb3e7ed928b2a960f3e003d10b44.jpg"/>
          </div>
          <div id="login-page-right">

            <div id="login-page-right-top">

              <div className="welcome">
                Welcome to PrinceJohn
              </div>

              {fieldInput('Username or Email', 'username')}

              {fieldInput('Password', 'password', 'password')}


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