import React from 'react';

import '../../sass/snapshots.scss';

export default React.createClass({
  getInitialState () {
      return {
        snapshots: [
          {file: 'images/snapshot1.jpg', active: true, created: '2016-07-07 09:00',},
          {file: 'images/snapshot2.jpg', active: false, created: '2016-07-07 10:00',},
          {file: 'images/snapshot3.jpg', active: false, created: '2016-07-07 11:00',},
          {file: 'images/snapshot4.jpg', active: false, created: '2016-07-07 12:00',},
        ]
      };
  },

  touchMove (event) {
    const touch = event.touches[0];
    const img = event.target;
    const targetX = touch.pageX - img.offsetLeft;
    const snapshots = this.state.snapshots;
    const groupValue = img.width / snapshots.length;

    for (let i = 1; i <= snapshots.length; i++) {
      const min = groupValue * (i - 1);
      const max = groupValue * i;
      snapshots[i - 1].active = false;

      if (targetX > min && targetX < max) {
        snapshots[i - 1].active = true;
      }
      else if (targetX < 0) {
        snapshots[0].active = true;
      }
      else {
        snapshots[snapshots.length - 1].active = true;
      }
    }

    this.setState({snapshots: snapshots});
  },

  render () {
    const snapshot = this.state.snapshots.find(snapshot => {
      return snapshot.active;
    });

    return (
      <div className="content">
        <div className="snapshot">
          <h2>{snapshot.created}</h2>
          <img src={snapshot.file} onTouchMove={this.touchMove} />
        </div>
      </div>
    );
  },
});
