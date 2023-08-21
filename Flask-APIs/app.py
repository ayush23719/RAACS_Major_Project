from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS
from sklearn import preprocessing

app = Flask(__name__)
# Enable CORS on your Flask app
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3000"}})

# Load the trained model
# Adjust the path to your model file
model = joblib.load('../Notebook/model.joblib')

# The column names for the independent variables
independent_columns = ["Latitude", "Longitude", "Day_of_Week",
                       "Weather_Conditions", "Road_Surface_Conditions"]

# Hardcoded data for the other columns
hardcoded_data = {
    "Location_Easting_OSGR": [366040],  # Fill in your value
    "Location_Northing_OSGR": [389140],  # Fill in your value
    "Speed_limit": [40],  # Fill in your value
    "2nd_Road_Class": [4],  # Fill in your value
    "Number_of_Vehicles": [2],  # Fill in your value
    "Light_Conditions": [1],  # Fill in your value
    "Year": [2010]  # Fill in your value
}


def preprocess_data(data):
    # Create a DataFrame with the correct columns
    columns = ["Location_Easting_OSGR", "Location_Northing_OSGR", "Longitude", "Latitude", "Day_of_Week", "Speed_limit",
               "2nd_Road_Class", "Number_of_Vehicles", "Light_Conditions", "Weather_Conditions", "Road_Surface_Conditions", "Year"]
    data_df = pd.DataFrame(columns=columns)

    # Fill in the values from the incoming data
    data_df['Latitude'] = [data.get('Latitude', None)]
    data_df['Longitude'] = [data.get('Longitude', None)]
    data_df['Day_of_Week'] = [data.get('Day_of_Week', None)]
    data_df['Weather_Conditions'] = [data.get('Weather_Conditions', None)]
    data_df['Road_Surface_Conditions'] = [
        data.get('Road_Surface_Conditions', None)]

    # Convert 'Weather_Conditions' and 'Road_Surface_Conditions' to categorical data type
    label_encoder = preprocessing.LabelEncoder()
    data_df['Weather_Conditions'] = label_encoder.fit_transform(
        data_df['Weather_Conditions'])
    data_df['Road_Surface_Conditions'] = label_encoder.fit_transform(
        data_df['Road_Surface_Conditions'])

    # Convert 'Latitude' and 'Longitude' to float values
    data_df['Latitude'] = data_df['Latitude'].astype(float)
    data_df['Longitude'] = data_df['Longitude'].astype(float)

    # Fill the hardcoded data into the DataFrame
    for column, values in hardcoded_data.items():
        data_df[column] = values

    return data_df


@app.route('/predict', methods=['POST'])
def predict():
    # Get the data from the request
    data = request.get_json()
    print("Received Data:", data)

    # Preprocess the data
    data_df = preprocess_data(data)
    print("Processed DataFrame:")
    # add new line after each column for better readability
    print(data_df.to_string(index=False, line_width=1000).replace(",", ",\n"))

    # Make predictions using the model
    # Here, you need to extract the necessary columns required for prediction
    prediction = model.predict(data_df[["Location_Easting_OSGR", "Location_Northing_OSGR", "Longitude", "Latitude", "Day_of_Week",
                               "Speed_limit", "2nd_Road_Class", "Number_of_Vehicles", "Light_Conditions", "Weather_Conditions", "Road_Surface_Conditions", "Year"]])

    # Convert the prediction to a standard Python data type (integer)
    prediction = int(prediction[0])

    # Return the prediction as JSON
    return jsonify({'severity_index': prediction})


if __name__ == '__main__':
    app.run(debug=True)
