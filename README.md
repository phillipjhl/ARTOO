# ARTOO

### Home automation and monitoring software. 

Collection of Python programs to run all smart devices in the home and enable a fully custom automation and monitoring toolkit.

"I don't remember ever owning a droid..."

This program will read sensor data from main hub along with data from external control boards reading different sensors around the house including temperature, gas, humidity, etc. and then automate a responsive action. 

Includes RESTful API that will handle requests and communication between all local devices. 

Main board will be directly connected to HVAC system for direct control.

The artoo_engine program is optimized for running on Rasberry Pi boards so it can interop with local system modules that read sensor data including buses and GPIO pins.

Running the artoo_engine program via a `systemctl` boot process.

The artoo django project is the main server hub that will handle database connections and incoming requests from the other external devices.
(Theoretically I could the main hub server on node-express if I need differenct libraries but I don't know my memory limitations yet.)

Currently running server with nginx for main hub for static files, and then gunicorn for multi-worker production django server.

React UI for interaction with connected sub-systems. UI will be accessable from main 7" ips screen on central RPI board. Since UI will be React based, this will lead to possible react-native apps as well as accessable from any browser on the local network.

### Starting

Install all client libraries.
```bash
$ cd artoo
$ npm install
```

Install all requirements.
`$ pipenv install`

Start shell within virtual environment.
`$ pipenv shell`

Start artoo engine.
`(ARTOO) $ python artoo_engine/main.py`

Create a `dev.py` and `prod.py` file in the `artoo/artoo/settings` directory.
In there you'll need to add the appropriate variables to override the settings from `common.py`.

If there isn't already a postgres DB, you'll need to create one and add the connection to the appropriate settings file.
Go ahead and `createsuperuser` to access the django admin if on a newly created DB.

Run migrations.
`$ python artoo/manage.py migrate --settings artoo.settings.dev`

Start django dev server and pass in pass in dev settings for dev environment.
`(ARTOO) $ python artoo/manage.py runserver --settings artoo.settings.dev`

For react development:

You will need a generated access token from the django_oauth_toolkit to access some server resources.
You can leace it an empty string if you don't need to be authorized.
Create config file and directory for client in `root/artoo/client/config/dev.js`:
```js
// in config/dev.js

let AUTH_TOKEN = "your_access_token";

export { AUTH_TOKEN };
```

If you need to start client. Run:
`$ npm run watch:client`

or

`$ npm run build:client` for production builds.

Run `python manage.py collectstatic` to generate static assets for production servers.

#### To Do In No Particular Order:

- [ ] Alexa integration
- [ ] Local server integrations (local cloud backups, 3d printer)
- [ ] Family Calender synchonization and display
- [ ] Weather, Traffic, and News service and display
- [ ] PUB/SUB features to servers
- [ ] Python code for sensor reading and PUB/SUB to ARTOO
    - [X] DHT11/22 sensor reading
    - [X] Relay activation
    - [ ] CO sensor reading
- [ ] HVAC scheduling
- [ ] IR motion sensors for lights and occupancy readings
- [ ] Temperature readings across the house to gauge appropriate air flow. Corresponding microcontrollers using stepper motors could be attached to air vents to then manage air flow based off of temp. readings
