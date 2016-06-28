import EventEmitter from 'event-emitter';

const Sensor = function (url, protocol) {
  this.socket = new WebSocket(url, protocol);
  //this.socket.onmessage = this.handleMessage.bind(this);
  //this.socket.onclose = this.handleOnClose.bind(this);
// 
  setInterval(() => {
    const value = Math.floor(Math.random() * 35) + -35;
    const message = '{"type": "temperature", "value": '+ value + '}';
    this.handleMessage({data: message})
  }, 1200);


  setInterval(() => {
    const speed = Math.floor(Math.random() * 20) + 0;
    const gust = Math.floor(Math.random() * 20) + 0;
    const message = '{"type": "wind", "value": "'+ speed + ','+gust+'"}';
    this.handleMessage({data: message})
  }, 1400);

  setInterval(() => {
    const value = Math.floor(Math.random() * 360) + 0;
    const message = '{"type": "direction", "value": '+ value + '}';
    this.handleMessage({data: message})
  }, 1600);

  setInterval(() => {
    const value = Math.floor(Math.random() * 100) + 0;
    const message = '{"type": "humidity", "value": '+ value + '}';
    this.handleMessage({data: message})
  }, 1800);

  setInterval(() => {
    const value = Math.floor(Math.random() * 20) + 0;
    const message = '{"type": "precipitation", "value": '+ value + '}';
    this.handleMessage({data: message})
  }, 1800);

  setInterval(() => {
    const value = Math.floor(Math.random() * 1100) + 200;
    const message = '{"type": "pressure", "value": '+ value + '}';
    this.handleMessage({data: message})
  }, 1800);
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

export default EventEmitter(new Sensor(
  'ws://192.168.200.128:3000', 'sensor-change'
));
