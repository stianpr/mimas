import React from 'react';

import DateSpan from '../datespan';
import Wind from '../stats/wind';
import Temperature from '../stats/temperature';
import Precipitation from '../stats/precipitation';
import weatherStore from '../stores/weather';

import '../../sass/weather.scss';


export default React.createClass({
  componentWillMount () {
    weatherStore.on('data', data => {
      this.setState(data);
    });
  },

  getInitialState () {
    return {
      wind_avg: 0.0,
      wind_max: 0.0,
      wind_direction_avg: 0,
      temp_min: 0.0,
      temp_max: 0.0,
      precipiation_sum: 0.0,
    };
  },

  render () {
    return (
      <div className="content">
        <DateSpan />
        <Wind
          avg={this.state.wind_avg}
          max={this.state.wind_max}
          direction={this.state.wind_direction_avg} />
        <Temperature min={this.state.temp_min} max={this.state.temp_max} />
        <Precipitation sum={this.state.precipiation_sum} />
      </div>
    );
  },
});
