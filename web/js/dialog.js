import React from 'react';

import '../sass/dialog.scss';


export default React.createClass({
  itemSelected (item) {
    this.props.onItemSelect(item);
  },

  render () {
    const style = {
      display: this.props.visible ? 'block': 'none',
      top: -40,
      left: 110,
    };

    const items = this.props.items.map(item => {
      return (
        <li onClick={this.itemSelected.bind(this, item)}>{item.title}</li>
      );
    });

    return (
      <div className="dialog" style={style}>
        <ol>
          {items}
        </ol>
      </div>
    );
  },
});
