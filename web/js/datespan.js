import React from 'react';

import '../sass/datespan.scss';

export default React.createClass({
  getInitialState () {
      return {
        selected: {
          title: 'I dag',
          from: '2016-07-16 00:00:00',
          to: '2016-07-17 00:00:00',
        },
      };
  },

  render () {
    return (
      <div className="datespan">
        <i className="ion-md-calendar"></i>
        <span>{this.state.selected.title}</span>
      </div>
    );
  },
});
