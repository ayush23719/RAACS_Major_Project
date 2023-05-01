import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import Base from "../components/Base";
const Home = () => {
  const [formData, setFormData] = useState({

  })
  const form = () => {
    return (
      <Card
        color=""
        shadow={false}
        className="w-auto p-16 flex justify-center items-center predict--card bg-[#ecf0f1] rounded-none shadow-lg"
      >
        <Typography variant="h1" color="blue-gray" className="form--heading">
          Prediction
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Latitude" variant="standard" className="text-xl"/>
            <Input size="lg" label="Longitude" variant="standard" className="text-xl"/>
            <Input size="lg" label="Age of Driver" variant="standard" className="text-xl"/>
            <Input type="lg" size="lg" label="Weather Condition" variant="standard" className="text-xl"/>
            <Input type="lg" size="lg" label="Road Condition" variant="standard" className="text-xl"/>
          </div>
          <Button className="mt-6 hover:bg-[#16a085] hover:text-white rounded-none mt-8" fullWidth ripple={true} variant="outlined">
            Predict
          </Button>
        </form>
      </Card>
    );
  };
  return (
    <Base>
      <div className="h-screen flex justify-center items-center">
        {form()}
      </div>
    </Base>
  );
};

export default Home;
