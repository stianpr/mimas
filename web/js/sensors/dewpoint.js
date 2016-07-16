import React from 'react';

import sensorStore from '../stores/sensor';


export default React.createClass({
  listener: null,

  componentWillMount () {
    sensorStore.on('humidity', this.humListener = data => {
      this.setState({ humidity: data });
    });
    sensorStore.on('temperature', this.tempListener = data => {
      this.setState({ temperature: data });
    });
  },

  componentWillUnmount () {
    sensorStore.off('humidity', this.humListener);
    sensorStore.off('temperature', this.tempListener);
  },

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.humidity !== this.state.humidity;
  },

  getInitialState () {
    return {
      humidity: 0.0,
      temperature: 0.0,
    };
  },

  render () {
    const humidity = parseFloat(this.state.humidity) / 100;
    const temperature = parseFloat(this.state.temperature);

    const a = 17.27;
    const b = 237.7;
    const formula = (a * temperature) / (b + temperature) + Math.log(humidity);
    let dewPoint = 0;

    if (!this.state.humidity || temperature < 0) {
      dewPoint = '0.0'
    }
    else {
      dewPoint = parseFloat((b * formula)  / (a - formula)).toFixed(1);
    }

    return (
      <div className="component dewpoint">
        <h2>Duggpunkt</h2>
        <div className="data">
          <h3>{dewPoint}</h3>
          <span>&deg;C</span>
        </div>
      </div>
    );
  },
});
