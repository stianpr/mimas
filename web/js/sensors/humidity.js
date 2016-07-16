import React from 'react';

import sensorStore from '../stores/sensor';


export default React.createClass({
  listener: null,

  componentWillMount () {
    sensorStore.on('humidity', this.listener = data => {
      this.setState({ humidity: data });
    });
  },

  componentWillUnmount () {
    sensorStore.off('humidity', this.listener);
  },

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.humidity !== this.state.humidity;
  },

  getInitialState () {
    return { humidity: 0 };
  },

  render () {
    const humidity = parseFloat(this.state.humidity).toFixed(1);

    return (
      <div className="humidity">
        <h2>Fuktighet</h2>
        <div className="data">
          <h3>{humidity}</h3>
          <span>%</span>
        </div>
      </div>
    );
  },
});
