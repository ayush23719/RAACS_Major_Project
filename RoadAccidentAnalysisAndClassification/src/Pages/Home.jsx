import { useState, useEffect } from "react";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [formData, setFormData] = useState({
    Latitude: "",
    Longitude: "",
    Day_of_Week: "",
    Weather_Conditions: "",
    Road_Surface_Conditions: "",
  });

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const Latitude = searchParams.get("Latitude");
    const Longitude = searchParams.get("Longitude");

    if (Latitude && Longitude) {
      setFormData((prevData) => ({
        ...prevData,
        Latitude,
        Longitude,
      }));
    }
  }, [location.search]);

  useEffect(() => {
    const getCurrentDayOfWeek = () => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const currentDate = new Date();
      return days[currentDate.getDay()];
    };

    setFormData((prevData) => ({
      ...prevData,
      Day_of_Week: getCurrentDayOfWeek(),
    }));
  }, []);

  const mapDayToNumber = (day) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days.indexOf(day) + 1;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Convert Latitude and Longitude to numbers
      const requestData = {
        ...formData,
        Latitude: parseFloat(formData.Latitude),
        Longitude: parseFloat(formData.Longitude),
        Weather_Conditions: formData.Weather_Conditions,
        Road_Surface_Conditions: formData.Road_Surface_Conditions,
        Day_of_Week: mapDayToNumber(formData.Day_of_Week), // Map day to its numerical value
      };

      const response = await axios.post("/predict", requestData);

      const predictions = response.data;
      alert(JSON.stringify(predictions)); // Do something with the predictions
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative z-2">
      <h2 className="text-center text-4xl font-bold mt-8 text-white">
        Analyze Your Region
      </h2>
      <form
        className="max-w-lg mx-auto bg-white p-8 rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4">
          <Input
            id="latitude"
            name="Latitude"
            value={formData.Latitude}
            onChange={handleChange}
            label="Latitude"
            className="w-full"
          />
          <Input
            id="longitude"
            name="Longitude"
            value={formData.Longitude}
            onChange={handleChange}
            label="Longitude"
            className="w-full"
          />
          <Select
            id="dayOfWeek"
            name="Day_of_Week"
            value={formData.Day_of_Week}
            onChange={handleChange}
            label="Day of Week"
            className="w-full"
          >
            <Option value="Sunday">Sunday</Option>
            <Option value="Monday">Monday</Option>
            <Option value="Tuesday">Tuesday</Option>
            <Option value="Wednesday">Wednesday</Option>
            <Option value="Thursday">Thursday</Option>
            <Option value="Friday">Friday</Option>
            <Option value="Saturday">Saturday</Option>
          </Select>

          <Select
            id="weather"
            name="Weather_Conditions"
            value={formData.Weather_Conditions}
            onChange={handleChange}
            mb={3}
            label="Weather"
            className="w-full"
          >
            <Option value="">Select weather</Option>
            <Option value="Unknown">Unknown</Option>
            <Option value="Fine without high winds">
              Fine without high winds
            </Option>
            <Option value="Raining without high winds">
              Raining without high winds
            </Option>

            <Option value="Snowing without high winds">
              Snowing without high winds
            </Option>
            <Option value="Raining with high winds">
              Raining with high winds
            </Option>
            <Option value="Fine with high winds">Fine with high winds</Option>

            <Option value="Fog or mist">Fog or mist</Option>
            <Option value="Snowing with high winds">
              Snowing with high winds
            </Option>
            <Option value="Other">Other</Option>
          </Select>

          <Select
            id="roadCondition"
            name="Road_Surface_Conditions"
            value={formData.Road_Surface_Conditions}
            onChange={handleChange}
            mb={3}
            label="Road Condition"
            className="w-full"
          >
            <Option value="">Select road condition</Option>
            <Option value="Dry">Dry</Option>
            <Option value="Wet/Damp">Wet/Damp</Option>
            <Option value="Frost/Ice">Frost/Ice</Option>
            <Option value="Snow">Snow</Option>
            <Option value="Flood (Over 3cm of water)">
              Flood (Over 3cm of water)
            </Option>
          </Select>
          <Button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full h-12 text-md"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Home;
