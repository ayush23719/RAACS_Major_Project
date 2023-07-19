import { useState } from "react";
import { Box, Label, Input, Select } from "theme-ui";
import { Button } from "@material-tailwind/react";

const Home = () => {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    age: "",
    weather: "",
    roadCondition: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          mb={3}
        />

        <Label htmlFor="longitude">Longitude</Label>
        <Input
          type="text"
          id="longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          mb={3}
        />

        <Label htmlFor="age">Age</Label>
        <Input
          type="text"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          mb={3}
        />

        <Label htmlFor="weather">Weather</Label>
        <Select
          id="weather"
          name="weather"
          value={formData.weather}
          onChange={handleChange}
          mb={3}
        >
          <option value="">Select weather</option>
          <option value="sunny">Sunny</option>
          <option value="cloudy">Cloudy</option>
          <option value="rainy">Rainy</option>
        </Select>

        <Label htmlFor="roadCondition">Road Condition</Label>
        <Select
          id="roadCondition"
          name="roadCondition"
          value={formData.roadCondition}
          onChange={handleChange}
          mb={3}
        >
          <option value="">Select road condition</option>
          <option value="dry">Dry</option>
          <option value="wet">Wet</option>
          <option value="icy">Icy</option>
        </Select>
        <Button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full h-12 text-md">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default Home;
