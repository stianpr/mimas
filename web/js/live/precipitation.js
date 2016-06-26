import React from 'react';


export default React.createClass({
  render () {
    const precipitation = parseFloat(this.props.precipitation).toFixed(1);

    return (
      <div className="data">
        <h3>{precipitation}</h3>
        <span>mm</span>
      </div>
    );
  },
});
