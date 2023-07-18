from flask import request
import pickle


@app.route('/predict', methods=['POST'])
def predict():
    # load trained model from pickle file
    with open('path/to/model.pkl', 'rb') as f:
        model = pickle.load(f)

    # get form data from request
    latitude = float(request.form['latitude'])
    longitude = float(request.form['longitude'])
    age = int(request.form['age'])
    weather = request.form['weather']
    road_condition = request.form['road_condition']

    # process form data
    # TODO: preprocess the form data according to your model's requirements

    # make prediction
    prediction = model.predict([preprocessed_data])

    # return prediction as JSON
    return {'prediction': prediction.tolist()}
