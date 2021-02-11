import React from 'react';
import homeFive from './home_five';
import homeFour from './home_four';
// import { Link } from 'react-router-dom';
import homeOne from './home_one'
import homeThree from './home_three';
import homeTwo from './home_two'




// https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__e61985cb13c119a29374ade4e7a49a47.png











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





