import React from 'react';



class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
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
          <label id="signup-page-input">

            <br/><br/>
            <input type={inputType} id="signup-page-input-field" placeholder={inputDisp} onChange={this.update(inputDB)}/>
          </label>
        </div>
      )
    }

    let form = (
      <div className="signup-page">

        <div id="signup-page-left">

          <div id="signup-page-left-top">
            <span id="signup-page-left-top-one">
              Make Your Money Move
            </span>

            <span id="signup-page-left-top-two">
              PrinceJohn lets you invest in companies you love, commission-free.
            </span>

            <div id="signup-page-left-top-field">
              <div id="signup-page-left-top-field-names">
                {fieldInput('First name', 'first_name')}
                {fieldInput('Last name', 'last_name')}
              </div>
              
              {fieldInput('Email', 'username')}
              {fieldInput('Password (min. 6 characters)', 'password', 'password')}

            </div>
          </div>

          <div id="signup-page-left-bottom">
            <button id="login-page-login" >{this.props.formType}</button>
          </div>
        </div>
        <div id="signup-page-right">
        Commission-free stock trading
We’ve cut the fat that makes other brokerages costly, like manual account management and hundreds of storefront locations, so we can offer zero commission trading.
Account Protection
Robinhood Financial is a member of SIPC. Securities in your account are protected up to $500,000. For details, please see www.sipc.org.
Keep tabs on your money
Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.
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

export default SignupForm;