import React from 'react';
import homeFive from './home_five';
import homeFour from './home_four';
import homeOne from './home_one'
import homeThree from './home_three';
import homeTwo from './home_two'
import NavBarContainerLoggedOut from '../../nav_bar/logged_out/nav_bar_container'


class HomeLoggedOut extends React.Component {

  render() {
    return (
      <div>
        <NavBarContainerLoggedOut/>
        {homeOne}
        {homeTwo}
        {homeThree}
        {homeFour}
        {homeFive}
      </div>
    )
  }

}


export default HomeLoggedOut;





