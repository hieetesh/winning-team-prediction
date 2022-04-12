from flask import Flask, render_template, request,  jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['GET','POST'])
def predict():
    # print('request900:', request.json);
    return jsonify({'prediction': 'Classifier predicts that the bike is not likely to be RECOVERED','status':'fail'})
