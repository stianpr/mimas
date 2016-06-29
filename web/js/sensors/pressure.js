import React from 'react';

import sensorStore from '../stores/sensor';


export default React.createClass({
  componentDidMount () {
    sensorStore.on('pressure', data => {
      this.setState({ pressure: data });
    });
  },

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.pressure !== this.state.pressure;
  },

  getInitialState () {
    return { pressure: 0 };
  },

  render () {
    const pressure = parseFloat(this.state.pressure).toFixed(1);

    return (
      <div className="data">
        <h3>{pressure}</h3>
        <span>hba</span>
      </div>
    );
  },
});
