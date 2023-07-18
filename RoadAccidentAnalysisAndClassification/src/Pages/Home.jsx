import { Card, Input, Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
const Home = () => {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    age: "",
    weather: "",
    road_condition: "",
  });

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    //submit data to flask api
  };
  const form = () => {
    return (
      <Card
        color=""
        shadow={true}
        className="w-auto p-16 flex justify-center items-center predict--card bg-[#ecf0f1] rounded-none shadow-lg predict--card"
      >
        <Typography variant="h1" color="blue-gray" className="form--heading">
          Prediction
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Latitude"
              variant="standard"
              className="text-xl"
              color="teal"
              name="latitude"
              onChange={handleFormChange}
            />
            <Input
              size="lg"
              label="Longitude"
              variant="standard"
              className="text-xl"
              color="teal"
              name="longitude"
              onChange={handleFormChange}
            />
            <Input
              size="lg"
              label="Age of Driver"
              variant="standard"
              className="text-xl"
              color="teal"
              name="age"
              onChange={handleFormChange}
            />
            <Input
              type="lg"
              size="lg"
              label="Weather Condition"
              variant="standard"
              className="text-xl"
              color="teal"
              name="weather"
              onChange={handleFormChange}
            />
            <Input
              type="lg"
              size="lg"
              label="Road Condition"
              variant="standard"
              className="text-xl"
              color="teal"
              name="road_condition"
              onChange={handleFormChange}
            />
          </div>
          <Button
            className="mt-6 text-black rounded-md border-none bg-white hover:bg-[#16a085] hover:text-white mt-8"
            fullWidth
            size="lg"
            ripple={true}
            variant=""
            onClick={formSubmit}
          >
            Predict
          </Button>
        </form>
      </Card>
    );
  };
  return (
    <Base>
      <div className="h-screen flex justify-center items-center">{form()}</div>
    </Base>
  );
};

export default Home;
