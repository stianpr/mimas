import React from 'react';

import setupFixedHeader from './fixed-header';
import Component from './component';
import WindSpeed from './live/windspeed';
import WindDirection from './live/winddirection';
import Temperature from './live/temperature';
import Pressure from './live/pressure';
import Precipitation from './live/precipitation';

import sensorStore from './stores/sensor';

const sensors = ['pressure', 'temperature', 'direction', 'precipitation'];

export default React.createClass({
  componentDidMount () {
    setupFixedHeader();

    sensors.forEach(sensor => {
      sensorStore.on(sensor, data => {
        let record = {};
        record[sensor] = data;
        this.setState(record);
      });
    });

    sensorStore.on('wind', data => {
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
      precipitation: 0.0,
    }
  },

  render () {
    return (
      <div className="content">
        <Component name='wind' title="Vind">
          <WindSpeed speed={this.state.wind} gust={this.state.gust} />
          <WindDirection degrees={this.state.direction} />
        </Component>
        <ul>
          <li>
            <Component name='temperature' title="Temperatur">
              <Temperature temperature={this.state.temperature} />
            </Component>
          </li>
          <li>
            <Component name='pressure' title="Trykk">
              <Pressure pressure={this.state.pressure} />
            </Component>
          </li>
        </ul>
        <Component name='precipitation' title="Regn (sist time)">
          <Precipitation precipitation={this.state.precipitation} />
        </Component>
      </div>
    );
  },
});
