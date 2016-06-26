import React from 'react';

import setupFixedHeader from './fixed-header';
import Component from './component';
import WindSpeed from './live/windspeed';
import WindDirection from './live/winddirection';
import Temperature from './live/temperature';
import Pressure from './live/pressure';


export default React.createClass({
  componentDidMount () {
    setupFixedHeader();
  },

  render () {
    return (
      <div className="content">
        <Component name='windspeed' title="Wind speed">
          <WindSpeed speed="6.3" gust="12.4" />
        </Component>
        <Component name='winddirection' title="Wind direction">
          <WindDirection degrees="327.0" />
        </Component>

        <ul>
          <li>
            <Component name='temperature' title="Temperature">
              <Temperature temperature="19.2" />
            </Component>
          </li>
          <li>
            <Component name='pressure' title="Pressure">
              <Pressure pressure="1009.2" />
            </Component>
          </li>
        </ul>
      </div>
    );
  },
});
