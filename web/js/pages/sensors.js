import React from 'react';

import setupFixedHeader from '../fixed-header';
import Component from '../component';
import WindSpeed from '../sensors/windspeed';
import WindDirection from '../sensors/winddirection';
import Temperature from '../sensors/temperature';
import Pressure from '../sensors/pressure';
import Precipitation from '../sensors/precipitation';
import Humidity from '../sensors/humidity';


export default React.createClass({
  componentDidMount () {
    setupFixedHeader();
  },

  render () {
    return (
      <div className="content">
        <Component name='wind' title="Vind">
          <WindSpeed />
          <WindDirection />
        </Component>
        <ul>
          <li>
            <Component name='temperature' title="Temperatur">
              <Temperature />
            </Component>
          </li>
          <li>
            <Component name='humidity' title="Fuktighet">
              <Humidity />
            </Component>
          </li>
        </ul>
        <ul>
          <li>
            <Component name='precipitation' title="Regn (sist time)">
              <Precipitation />
            </Component>
          </li>
          <li>
            <Component name='pressure' title="Trykk">
              <Pressure />
            </Component>
          </li>
        </ul>

      </div>
    );
  },
});
