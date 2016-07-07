import EventEmitter from 'event-emitter';

const Sensor = function (url, protocol) {
  this.url = url;
  this.protocol = protocol;
};

Sensor.prototype = {
  connect () {
    this.socket = new WebSocket(this.url, this.protocol);
    this.socket.onmessage = this.handleMessage.bind(this);
  },

  disconnect () {
    this.socket.close();
  },

  handleMessage (message) {
    const response = JSON.parse(message.data);
    this.emit(response.type, response.value);
  },
};

const store = EventEmitter(new Sensor(
  'ws://192.168.1.156:3000', 'sensor-change'
));

export default store;
