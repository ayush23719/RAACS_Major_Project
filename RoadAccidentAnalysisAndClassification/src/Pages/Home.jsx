import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import Base from "../components/Base";
const Home = () => {
  const form = () => {
    return (
      <Card
        color="white"
        shadow={true}
        className="w-[35vw] h-[60vh] flex justify-center items-center"
      >
        <Typography variant="h1" color="blue-gray" className="form--heading">
          Enter details
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Latitude" />
            <Input size="lg" label="Longitude" />
            <Input size="lg" label="Age of Driver" />
            <Input type="lg" size="lg" label="Weather Condition" />
            <Input type="lg" size="lg" label="Road Condition" />
          </div>
          <Button className="mt-6" fullWidth>
            Predict
          </Button>
        </form>
      </Card>
    );
  };
  return (
    <Base>
      <div className="h-screen bg-[#e2e2e2] flex justify-center items-center">
        {form()}
      </div>
    </Base>
  );
};

export default Home;
