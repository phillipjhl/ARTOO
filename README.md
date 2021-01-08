# ARTOO

### Home automation software. 

Collection of Python programs to run all smart devices in the home and enable a fully custom automation toolkit.

"I don't remember ever owning a droid..."

This program will read sensor data from main hub along with data from external arduino boards reading different sensors around the house including temperature, gas, humidity, etc. and then automate a responsive action. Includes RESTful API that will handle requests and communication between all local devices. Main board will be directly connected to HVAC system for direct control.

This program is optimized for running on Rasberry Pi boards so the server can interop with local system modules that read sensor data.
(Theoretically I could run it on node-express if I need differenct libraries but I don't know my memory limitations yet.)

React UI for interaction with connected sub-systems. UI will be accessable from main 7" ips screen on central RPI board. Since UI will be React based, this will lead to possible react-native apps as well as accessable from any browser on the local network.

### Starting

Install all client libraries.
```bash
$ cd artoo
$ npm install
```

If you need to start client. Run:
`$ npm run watch:client`

Install all requirements.
`$ pipenv install`

Start shell within virtual environment.
`$ pipenv shell`

Start artoo engine.
`(ARTOO) $ python artoo_engine/main.py`

Run migrations.
`$ python artoo/manage.py migrate --settings artoo.settings.dev`

Start django server and pass in pass in dev settings for dev environment.
`(ARTOO) $ python artoo/manage.py runserver --settings artoo.settings.dev`


#### To Do In No Particular Order:

- [ ] Alexa integration
- [ ] Local server integrations (local cloud backups, 3d printer)
- [ ] Family Calender synchonization and display
- [ ] Weather, Traffic, and News service and display
- [ ] PUB/SUB features to servers
- [ ] Arduino code for sensor reading and PUB/SUB to ARTOO (Arduino IDE)
- [ ] HVAC scheduling
- [ ] IR motion sensors for lights and occupancy readings
- [ ] Temperature readings across the house to gauge appropriate air flow. Corresponding microcontrollers using stepper motors could be attached to air vents to then manage air flow based off of temp. readings
