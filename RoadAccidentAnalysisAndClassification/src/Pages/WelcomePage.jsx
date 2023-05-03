import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import TypeWriterEffect from "react-typewriter-effect";
import Base from "../components/Base";
const WelcomePage = () => {
  return (
    <Base>
      <div className=" h-[85vh] w-full welcome flex flex-col justify-end items-start p-8">
        <div className="max-w-xl">
          <Typography variant="h1" color="black" className="text-6xl mx-6">
            <TypeWriterEffect
              textStyle={{ fontFamily: "Poppins", color: "white" }}
              startDelay={100}
              cursorColor="black"
              text="Minimizing Risk, Maximizing Safety: RoadWise"
              typeSpeed={100}
            />
          </Typography>
        </div>
        <div>
          <Link to={"/home"}>
            <Button
              variant=""
              className="w-full rounded-xl mt-6 text-xl text-black bg-white border-none hover:bg-[#16a085] hover:text-white mx-6"
              // fullWidth
              size="lg"
              ripple={true}
            >
              ANALYZE YOUR REGION
            </Button>
          </Link>
        </div>
      </div>
    </Base>
  );
};

export default WelcomePage;
