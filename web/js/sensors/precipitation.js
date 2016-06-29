import React from 'react';

import sensorStore from '../stores/sensor';


export default React.createClass({
  componentDidMount () {
    sensorStore.on('precipitation', data => {
      this.setState({ precipitation: data });
    });
  },

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.precipitation !== this.state.precipitation;
  },

  getInitialState () {
    return { precipitation: 0 };
  },

  render () {
    const precipitation = parseFloat(this.state.precipitation).toFixed(1);

    return (
      <div className="data">
        <h3>{precipitation}</h3>
        <span>mm</span>
      </div>
    );
  },
});
