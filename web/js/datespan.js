import React from 'react';

import { dates } from './utils/datespan';

import Dialog from './dialog';

import '../sass/datespan.scss';


export default React.createClass({
  getInitialState () {
    return {
      selected: dates[0],
      visibleDialog: false,
    };
  },

  toggleDialog () {
    this.setState({ visibleDialog: !this.state.visibleDialog });
  },

  onItemSelect (item) {
    this.toggleDialog();
    this.setState({selected: item});
  },

  render () {
    return (
      <div className="datespan" onClick={this.toggleDialog}>
        <i className="ion-md-calendar"></i>
        <span>{this.state.selected.title}</span>
        <Dialog
          items={dates}
          visible={this.state.visibleDialog}
          onItemSelect={this.onItemSelect} />
      </div>
    );
  },
});
