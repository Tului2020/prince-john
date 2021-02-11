import React from 'react';


const homeOne = (
  <div id="home-one"> 
    <p>ONE</p>
  </div>

)

const homeTwo = (
  <div id="home-two">
    <div>
      {/* <video id="videos" src="https://cdn.robinhood.com/assets/superbowl/superbowl.mp4"/> */}
    </div>
    <div>
      We are all investors
    </div>
  </div>
)

const homeThree = (
  <div id="home-three">
    <p>THREE</p>
  </div>
)

const homeFour = (
  <div id="home-four">
    <p>FOUR</p>
  </div>
)

const homeFive = (
  <div id="home-five">
    <p>FIVE</p>
  </div>
)

const homeSix = (
  <div id="home-six">
    <p>SIX</p>
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
        {homeSix}
        
      </div>
    )
  }

}


export default Home;





