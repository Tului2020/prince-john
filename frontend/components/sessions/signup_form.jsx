import React from 'react';



class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    
    return (e) => {
      // console.log(field, e.target.value)
      this.setState({ [field]: e.target.value })}
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.processForm(this.state)
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

            <br/><br/>
            <input type={inputType} id="signup-page-input-field" placeholder={inputDisp.charAt(0).toUpperCase() + inputDisp.slice(1)} onChange={this.update(inputDB)}/>
          </label>
        </div>
      )
    }

    // using ternary logic to define form
    let form = (
      <div className="signup-page">

        <div id="signup-page-left">

          <div id="signup-page-left-top">
            <span>
              Make Your Money Move
            </span>

            <span>
              LittleJohn lets you invest in companies you love, commission-free.

            </span>

            {fieldInput('first name', 'first_name')}
            {fieldInput('last name', 'last_name')}
            {fieldInput('email')}
            {fieldInput('username')}
            {fieldInput('password', 'password', 'password')}


          </div>

          <div>
            <button id="login-page-login" >{this.props.formType}</button>
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