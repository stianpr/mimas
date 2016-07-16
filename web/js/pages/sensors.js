import React from 'react';

import setupFixedHeader from '../fixed-header';
import Switchable from '../switchable';
import WindSpeed from '../sensors/windspeed';
import WindDirection from '../sensors/winddirection';
import WindChill from '../sensors/windchill';
import Temperature from '../sensors/temperature';
import Pressure from '../sensors/pressure';
import Precipitation from '../sensors/precipitation';
import Humidity from '../sensors/humidity';
import DewPoint from '../sensors/dewpoint';
import sensorStore from '../stores/sensor';

export default React.createClass({
  componentDidMount () {
    setupFixedHeader();
  },

  componentWillMount () {
    sensorStore.connect();
  },

  componentWillUnmount () {
    sensorStore.disconnect();
  },

  render () {
    return (
      <div className="content">
        <WindSpeed />
        <WindDirection />
        <ul>
          <li>
            <Switchable>
              <Temperature />
              <WindChill />
            </Switchable>
          </li>
          <li>
            <Switchable>
              <Humidity />
              <DewPoint />
            </Switchable>
          </li>
        </ul>
        <ul>
          <li>
            <Precipitation />
          </li>
          <li>
            <Pressure />
          </li>
        </ul>
      </div>
    );
  },
});
