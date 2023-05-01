import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import TypeWriterEffect from "react-typewriter-effect";

const WelcomePage = () => {
  return (
    <div className="h-screen w-screen welcome flex flex-col justify-center items-center">
      <div>
        <Typography variant="h1" color="black" className="text-7xl">
          <TypeWriterEffect
            textStyle={{ fontFamily: "Red Hat Display" }}
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
  );
};

export default WelcomePage;
