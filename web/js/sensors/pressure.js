import React from 'react';

import sensorStore from '../stores/sensor';


export default React.createClass({
  listener: null,

  componentWillMount () {
    sensorStore.on('pressure', this.listener = data => {
      this.setState({ pressure: data });
    });
  },

  componentWillUnmount () {
    sensorStore.off('pressure', this.listener);
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
