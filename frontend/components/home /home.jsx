import React from 'react';
import { Link } from 'react-router-dom';

const homeOne = (
  <div id="home-one"> 
    <div>
      <h1>Investing for <br/>Everyone</h1>
      <br/>
      <h2>
        Commission-free investing, plus the tools <br/>
        you need to put your money in motion. Sign <br/>
        up and get your first stock for free. Certain <br/>
        limitations apply.
      </h2>
      <br/>
      <div className="btn">
        <Link id="home-signup" to="/signup">Sign Up</Link>
      </div>
    </div>

    <div>
      <img height="100%" src="https://robinhoot.herokuapp.com/assets/Frontpage_image_1-478878b9c7ae69d83fe8e90f42e12d338caa5ffc18a0bc12791463a85d59e311.png" />
    </div>
  
    

  </div>

)

const homeTwo = (
  <div id="home-two">

    {/* <div id="border"> */}
      <video id="videos" src="https://cdn.robinhood.com/assets/superbowl/superbowl.mp4"
        width="50%" height="59vh"
      />
    {/* </div> */}

    <div id="home-two-style">
      We are all investors.
    </div>
    
  </div>
)

const homeThree = (
  <div id="home-three">
    <p>
      
Introducing Fractional Shares
Invest in thousands of stocks with as little as $1.
Invest Any Amount
Choose how much you want to invest, and we’ll convert from dollars to parts of a whole share.
Build a Balanced Portfolio
Customize your portfolio with pieces of different companies and funds to help reduce risk.
Trade in Real Time
Trades placed during market hours are executed at that time, so you’ll always know the share price.

Fractional Shares Disclosure</p>
  </div>
)

const homeFour = (
  <div id="home-four">
    <div>
    Get mobile access to the markets. Invest commission-free in individual companies or bundles of investments (ETFs).
    </div>
    <div>
      <img height="540" src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/1x__b8f3a854780a088fe18bebe63df09581.png"/>
    </div>
  </div>
)

const homeFive = (
  <div id="home-five">
    <div id="home-bottom">

      <p>© 2021 PrinceJohn. All rights reserved.</p>
      <br/>
      <p>
      PrinceJohn means PrinceJohn Markets and its web experiences.
      </p>
      <br/>
      <p>
        All investments involve risks, including the possible loss of capital.
      </p>

    </div>

  </div>
)







class Home extends React.Component {









  render() {
    return (
      <div>
        {homeOne}
        {homeTwo}
        {/* {homeThree} */}
        {/* {homeFour} */}
        {/* {homeFive} */}
      </div>
    )
  }

}


export default Home;





