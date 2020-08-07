import flask
from flask import request, jsonify, url_for, render_template
from sensors.dht_sensor import DHT_SENSOR
from relays.hvac import test_relays

app = flask.Flask(__name__)
app.config["DEBUG"] = True

dht_sensor = DHT_SENSOR("DHT22")

@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")

@app.route('/api/sensors/temperature', methods=['GET'])
def sensor():
    
    result = dht_sensor.read_sensor()
    print(result)
    data = {}
    if result[0] and result[1]:
        data = {"temp": result[0], "humidity": result[1]}
    
    return jsonify(data)

@app.route("/api/relays/hvac", methods=['GET'])
def test():
    test_relays()
    return


app.run()