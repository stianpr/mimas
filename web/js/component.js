import React from 'react';


export default React.createClass({
  render () {
    const classes = this.props.name + ' component';
    return (
      <div className={classes}>
        <h2>{this.props.title}</h2>
        {this.props.children}
      </div>
    );
  },
});
