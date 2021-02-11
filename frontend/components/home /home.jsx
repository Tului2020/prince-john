import React from 'react';


const homeOne = (
  <div id="home-one"> 
    <div>
      <h1>Investing for Everyone</h1>
      <h1>Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations apply.</h1>
      
    </div>
    <div>
      <img height="660" src="https://robinhoot.herokuapp.com/assets/Frontpage_image_1-478878b9c7ae69d83fe8e90f42e12d338caa5ffc18a0bc12791463a85d59e311.png" />
    </div>
  
  </div>

)

const homeTwo = (
  <div id="home-two">
    <div>
      <video id="videos" src="https://cdn.robinhood.com/assets/superbowl/superbowl.mp4"/>
    </div>
    <div>
      We are all investors
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
      dsaddsadasdasdasdassa
    </div>
    <div>
      <img height="540" src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__e1232689b2632b308615065dcf30be41.png"/>
    </div>
  </div>
)

const homeFive = (
  <div id="home-five">
    <p>FIVE</p>
  </div>
)







class Home extends React.Component {









  render() {
    return (
      <div>
        {homeOne}
        {homeTwo}
        
        
        {homeThree}
        {homeFour}
        {homeFive}

        
      </div>
    )
  }

}


export default Home;





