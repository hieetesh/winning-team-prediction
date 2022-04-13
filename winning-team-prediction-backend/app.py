from flask import Flask, render_template, request,  jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
import predictor_model
import h5py

app = Flask(__name__)
CORS(app)

file_name = "weights_best.hdf5"

@app.route('/predict', methods=['GET','POST'])
def predict():
    print('request', request.json)

    homeTeamName = request.json["homeTeamName"]
    awayTeamName = request.json["awayTeamName"]
    scheduledWeek = request.json["scheduledWeek"]
    playOff = request.json["playOff"]

    predict_model = predictor_model.NFLPredictor('nfl_predictor.model','weights_best.hdf5')

    print("predict_model: ",type(predict_model))

    predict_winner = predict_model.predict(homeTeamName,awayTeamName,playOff,scheduledWeek)

    print("predict: ", predict_winner)

    return jsonify({'prediction': predict_winner})
