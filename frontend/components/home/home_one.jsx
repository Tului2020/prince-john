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
      {/* <video src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__327bf4cc768a323497d5aaa7416319c2.mp4"/> */}
      <img height="100%" src="https://robinhoot.herokuapp.com/assets/Frontpage_image_1-478878b9c7ae69d83fe8e90f42e12d338caa5ffc18a0bc12791463a85d59e311.png" />
    </div>
  </div>
)


export default homeOne;