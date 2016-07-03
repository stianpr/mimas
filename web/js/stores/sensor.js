import EventEmitter from 'event-emitter';

const Sensor = function (url, protocol) {
  this.socket = new WebSocket(url, protocol);
  this.socket.onmessage = this.handleMessage.bind(this);
  this.socket.onclose = this.handleOnClose.bind(this);
};

Sensor.prototype = {
  handleMessage (message) {
    const response = JSON.parse(message.data);
    this.emit(response.type, response.value);
  },

  handleOnClose () {
    console.log("websocket closed");
  }
};

const store = EventEmitter(new Sensor(
  'ws://192.168.1.156:3000', 'sensor-change'
));

export default store;
