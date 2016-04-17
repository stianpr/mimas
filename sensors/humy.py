from lib.DHT22 import DHT22


sensor = DHT22()
humidity, temperature = sensor.get_readings()

print('{} % - {} C'.format(humidity, temperature))
