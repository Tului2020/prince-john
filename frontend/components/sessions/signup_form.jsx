import React from 'react';
import { Link, Redirect } from 'react-router-dom';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      balance: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state).then(() => this.props.history.push('/'));
    // <Redirect to ='/'/>
  }

  componentWillUnmount() {
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
          <label id="signup-page-input">

            <br /><br />
            <input type={inputType} className="signup-field" id={`signup-${inputDB}`} placeholder={inputDisp} onChange={this.update(inputDB)} />
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

            <div id="signup-page-left-bottom-left">
              <button id="signup-page-continue" >Continue</button>
            </div>

            <div id="signup-page-left-bottom-right">
              <div>
                Already started?
              </div>
              <div>
                <Link id="signup-page-login-link" to='/login'>Login to complete your application</Link>
              </div>
            </div>
          </div>

          <div id="signup-page-left-errors">
            {displayErrors}
            {/* {this.setState({})} */}
          </div>  


        </div>



        <div id="signup-page-right">
          <div id="test">
            <span id="signup-page-right-title">
            Commission-free stock trading
            </span><br/>
            We’ve cut the fat that makes other brokerages costly, like manual account management and hundreds of storefront locations, so we can offer zero commission trading.

          </div>

          <div id="test">

            <span id="signup-page-right-title">
              Account Protection
            </span>
            <br/>
            Robinhood Financial is a member of SIPC. Securities in your account are protected up to $500,000. For details, please see www.sipc.org.

          </div>

          <div id="test">
            <span id="signup-page-right-title">
            Keep tabs on your money
            </span>
            <br/>
            Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.

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

export default SignupForm;