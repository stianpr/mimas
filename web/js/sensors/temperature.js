import React from 'react';

import sensorStore from '../stores/sensor';


export default React.createClass({
  componentDidMount () {
    sensorStore.on('temperature', data => {
      this.setState({ temperature: data });
    });
  },

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.temperature !== this.state.temperature;
  },

  getInitialState () {
    return { temperature: 0 };
  },

  render () {
    const temperature = parseFloat(this.state.temperature).toFixed(1);

    return (
      <div className="data">
        <h3>{temperature}</h3>
        <span>&deg;C</span>
      </div>
    );
  },
});
