import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import TypeWriterEffect from "react-typewriter-effect";
import Base from "../components/Base";
const WelcomePage = () => {
  return (
    <Base>
      <div className=" h-[85vh] w-full welcome flex flex-col justify-end items-start p-8">
        <div className="max-w-2xl">
          <Typography variant="h1" color="black" className="text-6xl">
            <TypeWriterEffect
              textStyle={{ fontFamily: "Roboto Mono" }}
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
              variant="outlined"
              className="w-full rounded-none mt-6 text-xl text-black border-[#16a085] hover:bg-[#16a085] hover:text-white"
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
