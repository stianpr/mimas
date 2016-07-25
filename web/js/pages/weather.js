import React from 'react';

import DateSpan from '../datespan';
import Wind from '../stats/wind';
import Temperature from '../stats/temperature';
import Precipitation from '../stats/precipitation';
import weatherStore from '../stores/weather';

import '../../sass/weather.scss';


export default React.createClass({
  componentWillMount () {
    weatherStore.get().then(data => {
      this.setState(data);
    });
  },

  getInitialState () {
    return {
      wind_avg: 10.2,
      wind_max: 24.0,
      wind_direction_avg: 265,
      temp_min: -2.9,
      temp_max: 28.2,
      precipitation_sum: 22.2,
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
        <Precipitation sum={this.state.precipitation_sum} />
      </div>
    );
  },
});
