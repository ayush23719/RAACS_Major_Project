import { useState, useEffect } from "react";
import { Box, Label, Input, Select } from "theme-ui";
import { Button } from "@material-tailwind/react";
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
      console.log(predictions); // Do something with the predictions
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "2rem",
          color: "white",
        }}
      >
        Analyze Your Region
      </h2>
      <Box
        as="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "500px",
          width: "90%",
          margin: "0 auto",
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          type="text"
          id="latitude"
          name="Latitude"
          value={formData.Latitude}
          onChange={handleChange}
          mb={3}
        />

        <Label htmlFor="longitude">Longitude</Label>
        <Input
          type="text"
          id="longitude"
          name="Longitude"
          value={formData.Longitude}
          onChange={handleChange}
          mb={3}
        />

        <Label htmlFor="dayOfWeek">Day of Week</Label>
        <Select
          id="dayOfWeek"
          name="Day_of_Week"
          value={formData.Day_of_Week}
          onChange={handleChange}
          mb={3}
        >
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </Select>

        <Label htmlFor="weather">Weather</Label>
        <Select
          id="weather"
          name="Weather_Conditions"
          value={formData.Weather_Conditions}
          onChange={handleChange}
          mb={3}
        >
          <option value="">Select weather</option>
          <option value="Unknown">Unknown</option>
          <option value="Fine without high winds">
            Fine without high winds
          </option>
          <option value="Raining without high winds">
            Raining without high winds
          </option>

          <option value="Snowing without high winds">
            Snowing without high winds
          </option>
          <option value="Raining with high winds">
            Raining with high winds
          </option>
          <option value="Fine with high winds">Fine with high winds</option>

          <option value="Fog or mist">Fog or mist</option>
          <option value="Snowing with high winds">
            Snowing with high winds
          </option>
          <option value="Other">Other</option>
        </Select>

        <Label htmlFor="roadCondition">Road Condition</Label>
        <Select
          id="roadCondition"
          name="Road_Surface_Conditions"
          value={formData.Road_Surface_Conditions}
          onChange={handleChange}
          mb={3}
        >
          <option value="">Select road condition</option>
          <option value="Dry">Dry</option>
          <option value="Wet/Damp">Wet/Damp</option>
          <option value="Frost/Ice">Frost/Ice</option>
          <option value="Snow">Snow</option>
          <option value="Flood (Over 3cm of water)">
            Flood (Over 3cm of water)
          </option>
        </Select>
        <Button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full h-12 text-md"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default Home;
