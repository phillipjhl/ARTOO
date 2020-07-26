import flask
from flask import request, jsonify, url_for, render_template

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")

app.run()