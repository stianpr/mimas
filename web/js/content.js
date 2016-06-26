import React from 'react';

import setupFixedHeader from './fixed-header';
import Component from './component';
import WindSpeed from './live/windspeed';
import WindDirection from './live/winddirection';
import Temperature from './live/temperature';
import Pressure from './live/pressure';

import sensorStore from './stores/sensor';

export default React.createClass({
  componentDidMount () {
    setupFixedHeader();

    ['pressure', 'temperature', 'direction'].forEach(sensor => {
      sensorStore.on(sensor, (data) => {
        this.setState({sensor: data});
      });
    });

    sensorStore.on('wind', (data) => {
      const wind = data.split(',');
      this.setState({
        wind: wind[0],
        gust: wind[1],
      });
    });
  },

  getInitialState () {
    return {
      pressure: 0.0,
      temperature: 0.0,
      direction: 0.0,
      wind: 0.0,
      gust: 0.0,
    }
  },

  render () {
    return (
      <div className="content">
        <Component name='windspeed' title="Wind speed">
          <WindSpeed speed={this.state.wind} gust={this.state.gust} />
        </Component>
        <Component name='winddirection' title="Wind direction">
          <WindDirection degrees={this.state.direction} />
        </Component>
        <ul>
          <li>
            <Component name='temperature' title="Temperature">
              <Temperature temperature={this.state.temperature} />
            </Component>
          </li>
          <li>
            <Component name='pressure' title="Pressure">
              <Pressure pressure={this.state.pressure} />
            </Component>
          </li>
        </ul>
      </div>
    );
  },
});
