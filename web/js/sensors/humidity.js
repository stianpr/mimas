import React from 'react';

import sensorStore from '../stores/sensor';


export default React.createClass({
  componentDidMount () {
    sensorStore.on('humidity', data => {
      this.setState({ humidity: data });
    });
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
      <div className="data">
        <h3>{humidity}</h3>
        <span>%</span>
      </div>
    );
  },
});
