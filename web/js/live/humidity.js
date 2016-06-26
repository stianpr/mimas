import React from 'react';


export default React.createClass({
  render () {
    const humidity = parseFloat(this.props.humidity).toFixed(1);

    return (
      <div className="data">
        <h3>{humidity}</h3>
        <span>%</span>
      </div>
    );
  },
});
