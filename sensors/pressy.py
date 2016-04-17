import Adafruit_BMP.BMP280 as BMP280


sensor = BMP280.BMP280(address=0x76)
temp = sensor.read_temperature()
pressure = sensor.read_pressure() / 100
altitude = sensor.read_altitude()

print('{} C - {} hPA - {} m'.format(temp, round(pressure), round(altitude)))
