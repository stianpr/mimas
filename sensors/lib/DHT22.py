import pigpio


_3W = (1 << 9)
_3WN = (15 << 10)

SPEED = 200000
BYTES = 130


def get_bit(in_bit, in_byte, buf):
    v = not (buf[in_byte] & (1 << (7 - in_bit)))  # Force logical result.
    numbit = 1

    while in_byte < BYTES:
        in_bit += 1
        if in_bit > 7:
            in_bit = 0
            in_byte += 1

        nv = not (buf[in_byte] & (1 << (7 - in_bit)))  # Force logical result.
        if nv == v:
            numbit += 1

        else:
            if not v:  # Return high edge.
                return (numbit, in_bit, in_byte)
            else:  # Skip low edge.
                v = nv
                numbit = 1

    return (0, 0, 0)


class DHT22(object):
    def __init__(self):
        self.pi = pigpio.pi()  # Connect to local Pi.
        self.sensor = None

    def get_values(self):
        (c, buf) = self.pi.spi_read(self.sensor, BYTES + 1)

        numbit = 1
        in_bit = 0
        in_byte = 0
        (numbit, in_bit, in_byte) = get_bit(in_bit, in_byte, buf)
        (numbit, in_bit, in_byte) = get_bit(in_bit, in_byte, buf)
        bit = 0
        byte = 0
        val = [0] * 5
        while numbit:
            (numbit, in_bit, in_byte) = get_bit(in_bit, in_byte, buf)
            if numbit:
                if numbit > 9:
                    val[byte] |= (1 << (7 - bit))
                bit += 1
                if bit > 7:
                    bit = 0
                    byte += 1

        checksum = 0
        for i in range(4):
            checksum += val[i]
            if val[4] == (checksum & 255):
                humidity = ((val[0] * 256) + val[1]) / 10.0
                sign = val[2] & 128
                val[2] &= 0x127
                temperature = ((val[2] * 256) + val[3]) / 10.0
                if sign:
                    temperature = -temperature

                return (humidity, temperature)

        return (None, None)

    def get_readings(self):
        self.sensor = self.pi.spi_open(0, SPEED, _3W | _3WN)

        humidity, temperature = self.get_values()

        self.pi.spi_close(self.sensor)
        self.pi.stop()

        return humidity, temperature
