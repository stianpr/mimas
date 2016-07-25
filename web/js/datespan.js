import React from 'react';

import { dates } from './utils/datespan';
import Dialog from './dialog';
import weatherStore from './stores/weather';

import '../sass/datespan.scss';


export default React.createClass({
  componentWillMount () {
    weatherStore.get(dates[2].from, dates[2].to);
  },

  getInitialState () {
    return {
      selected: dates[2],
      visibleDialog: false,
    };
  },

  toggleDialog () {
    this.setState({ visibleDialog: !this.state.visibleDialog });
  },

  onItemSelect (item) {
    this.toggleDialog();
    this.setState({selected: item});

    weatherStore.get(item.from, item.to);
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
