import React from 'react';

const shapeImage = <img height="530px" src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__e61985cb13c119a29374ade4e7a49a47.png" alt=""/>

const table = (
  <div>

    <table id="customers">
      <tbody>
        <tr>
          <th>Invest Any Amount</th>
          <th>Build a Balanced Portfolio</th>
          <th>Trade in Real Time</th>
        </tr>

        <tr>
          <td>
            Choose how much you want to <br/>
            invest, and we’ll convert from <br/>
            dollars to parts of a whole <br/>
            share.</td>
          <td>
            Customize your portfolio with <br/>
            pieces of different companies <br/>
            and funds to help reduce risk.</td>
          <td>
            Trades placed during market <br/>
            hours are executed at that time, <br/>
            so you’ll always know the share <br/>
            price.</td>
        </tr>
      </tbody>
    </table>


  </div>
)




const homeThree = (
  <div id="home-three">

    <div>
      <div style={{fontSize: '32px'}}>Introducing Fractional Shares</div>
      
      <div style={{color: 'rgb(111,120,126)'}}>
        Invest in thousands of stocks with as little as $1.
      </div>
      
      {table}

      <div>
        Fractional Shares Disclosure
      </div>
    </div>
  
  
    {shapeImage}

  </div>

)


export default homeThree;