import React from 'react';

import sensorStore from '../stores/sensor';


export default React.createClass({
  listener: null,

  componentWillMount () {
    sensorStore.on('precipitation', this.listener = data => {
      this.setState({ precipitation: data });
    });
  },

  componentWillUnmount () {
    sensorStore.off('precipitation', this.listener);
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
      <div className="component precipitation">
        <h2>Regn</h2>
        <div className="data">
          <h3>{precipitation}</h3>
          <span>mm</span>
        </div>
      </div>
    );
  },
});
