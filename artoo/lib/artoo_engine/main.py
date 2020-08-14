from sensors.dht_sensor import DHT_SENSOR
from relays.hvac import test_relays
from time import sleep
import config

dht_sensor = DHT_SENSOR("DHT22")
SYSTEM_STATE = config.SYSTEM_STATE
temp: float
humidity: float
sensor_data: dict = {}
TEMP_GOAL: str = 'COOL'
HEAT_SETTING: int = 69
COOL_SETTING: int = 74
active_sleep_limit: int = 10
active_sleep_counter: int = 0

def read_sensor(sensor: DHT_SENSOR):
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
    test_relays()
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
    global active_sleep_limit
    global active_sleep_counter
    
    try:
        print('SYSTEM STATE: {}'.format(SYSTEM_STATE))
        sensor_data = read_sensor(dht_sensor)
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
                        print("Limit of {} tries reached. System shutoff.", format(active_sleep_limit))
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

while True:
    main()
