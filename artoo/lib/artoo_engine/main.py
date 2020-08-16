from sensors import dht_sensor
from relays import hvac
import config
from time import sleep

DHT22_1 = dht_sensor.DHT_SENSOR("DHT22")
SYSTEM_STATE: str = config.SYSTEM_STATE
temp: float = config.temp
humidity: float = config.humidity
sensor_data: dict = config.sensor_data
TEMP_GOAL: str = config.TEMP_GOAL
HEAT_SETTING: int = config.HEAT_SETTING
COOL_SETTING: int = config.COOL_SETTING
ACTIVE_SLEEP_LIMIT: int = config.ACTIVE_SLEEP_LIMIT
ACTIVE_SLEEP_COUNTER: int = config.ACTIVE_SLEEP_COUNTER


def read_sensor(sensor: dht_sensor.DHT_SENSOR):
    result = sensor.read_sensor()
    print(result)
    global sensor_data
    global temp
    global humidity
    try:
        temp = int(result[0])
        hum = int(result[1])
        sensor_data = {"temp": temp, "humidity": hum}
        return sensor_data
    except:
        print("Error when reading sensor")
        sleep(2)
        read_sensor(sensor)


def test():
    hvac.test_relays()
    return


def main():
    global SYSTEM_STATE
    global temp
    global humidity
    global sensor_data
    global TEMP_GOAL
    global HEAT_SETTING
    global COOL_SETTING
    check_delay = 5
    active_delay = 500
    global ACTIVE_SLEEP_LIMIT
    global ACTIVE_SLEEP_COUNTER

    while True:
        try:
            print('SYSTEM STATE: {}'.format(SYSTEM_STATE))
            sensor_data = read_sensor(DHT22_1)
            if sensor_data is not None:
                temp = int(sensor_data["temp"])
                humidity = int(sensor_data["humidity"])
            RANGE = range(HEAT_SETTING, COOL_SETTING)
            print(RANGE)

            if TEMP_GOAL == 'COOL':
                goal = RANGE[-1]
                if temp <= goal:
                    print("Temperature is in range.")

                    if SYSTEM_STATE == 'ACTIVE':
                        print("Turning off system")
                        # turn system off since temp in range
                        SYSTEM_STATE = 'INACTIVE'
                        # turn off appropriate relays
                    else:
                        SYSTEM_STATE = 'INACTIVE'

                    print("Delaying next check")
                    # real delay will be ~ 2 minutes
                    sleep(check_delay)

                else:
                    print("Temperature is out of range.")
                    # keep track of 'ACTIVE' state
                    print("Checking settings...")

                    if SYSTEM_STATE == 'ACTIVE':
                        print("system already active")
                        print("System waiting: {}s", format(active_delay))
                        sleep(active_delay)
                        active_sleep_counter += 1
                        if active_sleep_counter > active_sleep_limit:
                            print("Limit of {} tries reached. System shutoff.",
                                  format(active_sleep_limit))
                            SYSTEM_STATE = 'SHUTOFF'
                    else:
                        print("Verifying and activating system")
                        SYSTEM_STATE = 'ACTIVE'
                        # activate relays
                        test_relays()
                        # real delay will be > 2 minutes
                        sleep(check_delay)

        except RuntimeError as error:
            print("Runtime error, program stopped")
            print(error.args[0])
        except:
            sleep(check_delay)


main()
