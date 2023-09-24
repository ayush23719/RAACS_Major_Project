from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS
from sklearn import preprocessing
import requests

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

model = joblib.load('../Notebook/model.joblib')

hardcoded_data = {
    "Location_Easting_OSGR": [366040],
    "Location_Northing_OSGR": [389140],
    "Speed_limit": [40],
    "2nd_Road_Class": [4],
    "Light_Conditions": [1],
}


weather_api_key = "fb81fd36c26dbb449c5ede2b35c7364d"


windy_or_not = {
    'clear sky': 'Fine without high winds',
    'few clouds': 'Fine without high winds',
    'scattered clouds': 'Fine without high winds',
    'broken clouds': 'Fine without high winds',
    'overcast clouds': 'Fine with high winds',
}


def fetch_weather_data(latitude, longitude, api_key):

    url = f"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}"

    response = requests.get(url)

    data = response.json()

    weather_id = data["weather"][0]["id"]
    weather_description = data["weather"][0]["description"]

    first_digit = int(str(weather_id)[0])

    default_mapping = {
        3: 'Raining without high winds',
        2: 'Raining with high winds',
        5: 'Raining with high winds',
        6: 'Snowing without high winds',
        7: 'Fog or mist',

    }

    print("Weather ID:", weather_id)
    if first_digit == 8:
        mapped_weather_condition = windy_or_not.get(
            weather_description, 'Unknown')
    else:
        mapped_weather_condition = default_mapping.get(first_digit, 'Unknown')

    print("Weather Condition:", mapped_weather_condition)

    return mapped_weather_condition


def preprocess_data(data):

    columns = ["Location_Easting_OSGR", "Location_Northing_OSGR", "Longitude", "Latitude", "Day_of_Week", "Speed_limit",
               "2nd_Road_Class", "Number_of_Vehicles", "Light_Conditions", "Weather_Conditions", "Road_Surface_Conditions", "Year"]
    data_df = pd.DataFrame(columns=columns)

    start_latitude = data.get('startLat', None)
    start_longitude = data.get('startLong', None)
    end_latitude = data.get('endLat', None)
    end_longitude = data.get('endLong', None)
    Year = data.get('Year', None)
    Day_of_Week = data.get('Day_of_Week', None)
    Number_of_Vehicles = data.get('Number_of_Vehicles', None)

    if start_latitude is None or start_longitude is None or end_latitude is None or end_longitude is None:
        return jsonify({'error': 'Invalid coordinates'}), 400

    average_latitude = (start_latitude + end_latitude) / 2
    average_longitude = (start_longitude + end_longitude) / 2

    print("Average Latitude:", average_latitude)
    print("Average Longitude:", average_longitude)

    data_df['Latitude'] = [average_latitude]
    data_df['Longitude'] = [average_longitude]
    data_df['Day_of_Week'] = [Day_of_Week]
    data_df['Number_of_Vehicles'] = [Number_of_Vehicles]
    data_df['Year'] = [Year]

    data_df['Road_Surface_Conditions'] = ["Dry"]
    weather_condition = fetch_weather_data(
        average_latitude, average_longitude, weather_api_key)

    data_df['Weather_Conditions'] = [weather_condition]

    label_encoder = preprocessing.LabelEncoder()
    data_df['Weather_Conditions'] = label_encoder.fit_transform(
        data_df['Weather_Conditions'])
    data_df['Road_Surface_Conditions'] = label_encoder.fit_transform(
        data_df['Road_Surface_Conditions'])

    data_df['Latitude'] = data_df['Latitude'].astype(float)
    data_df['Longitude'] = data_df['Longitude'].astype(float)

    for column, values in hardcoded_data.items():
        data_df[column] = values

    return data_df


@app.route('/predict', methods=['POST'])
def predict():

    data = request.get_json()
    print("Received Data:", data)

    data_df = preprocess_data(data)
    print("Processed DataFrame:")

    print(data_df.to_string(index=False, line_width=1000).replace(",", ",\n"))

    prediction = model.predict(data_df[["Location_Easting_OSGR", "Location_Northing_OSGR", "Longitude", "Latitude", "Day_of_Week",
                               "Speed_limit", "2nd_Road_Class", "Number_of_Vehicles", "Light_Conditions", "Weather_Conditions", "Road_Surface_Conditions", "Year"]])

    prediction = int(prediction[0])

    return jsonify({'severity_index': prediction})


if __name__ == '__main__':
    app.run(debug=True)
