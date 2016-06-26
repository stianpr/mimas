import React from 'react';


export default React.createClass({
  render () {
    return (
      <div className="data">
        <h3>{this.props.temperature}</h3>
        <span>&deg;C</span>
      </div>
    );
  },
});
