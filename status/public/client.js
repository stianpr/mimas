function SensorStatus () {
    this.temperature = document.getElementById('temperature');
    this.humidity = document.getElementById('humidity');
    this.pressure = document.getElementById('pressure');
    this.rain = document.getElementById('rain');
    this.windAvg = document.getElementById('wind-avg');
    this.windGust = document.getElementById('wind-gust');
};

SensorStatus.prototype.connect = function () {
    var url = "ws://localhost:3000/";
    this.socket = new WebSocket(url, 'sensor-status');

    this.socket.onmessage = this.handleWebsocketMessage.bind(this);
    this.socket.onclose = this.handleWebsocketClose.bind(this);
};

SensorStatus.prototype.handleWebsocketMessage = function (message) {
    try {
        var response = JSON.parse(message.data);
    }
    catch(e) { /* do nothing */ }

    if (response) {
        this.updateData(response.data);
    }
};

SensorStatus.prototype.handleWebsocketClose = function () {
    console.log("WebSocket Connection Closed.");
};

SensorStatus.prototype.updateData = function (data) {
    this.temperature.textContent = data.temperature;
    this.humidity.textContent = data.humidity;
    this.pressure.textContent = data.pressure;
    this.rain.textContent = data.rain;
    this.windAvg.textContent = data.wind.avg;
    this.windGust.textContent = data.wind.gust;
};



var sensor = new SensorStatus();
sensor.connect();
