import React from 'react';

import sensorStore from '../stores/sensor';


export default React.createClass({
  listener: null,

  componentWillMount () {
    sensorStore.on('wind', this.windListener = data => {
      this.setState({ wind: data.split(',')[0] });
    });

    sensorStore.on('temperature', this.tempListener = data => {
      this.setState({ temperature: data });
    });
  },

  componentWillUnmount () {
    sensorStore.off('wind', this.windListener);
    sensorStore.off('temperature', this.tempListener);
  },

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.wind !== this.state.wind;
  },

  getInitialState () {
    return {
      wind: 0.0,
      temperature: 0.0,
    };
  },

  render () {
    const windKph = parseFloat(this.state.wind) * 3.6;
    const temperature = parseFloat(this.state.temperature);
    let windChill = '-';

    if (this.state.wind && this.state.temperature) {
      windChill = (
        13.12 + 0.6215 * temperature -
        11.37 *  Math.pow(windKph, 0.16) +
        0.3965 * temperature * Math.pow(windKph, 0.16)).toFixed(2)
    }

    return (
      <div className="component windchill">
        <h2>Effektiv temp.</h2>
        <div className="data">
          <h3>{windChill}</h3>
          <span>&deg;C</span>
        </div>
      </div>
    );
  },
});
