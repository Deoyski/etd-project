// Home.js
import { Link } from "react-router-dom";
import background from "../assets/background.png";
import MainNavbar from "./MainNavbar";

function Home() {
  return (
    <>
      <MainNavbar />
      <div className="relative h-screen flex justify-center items-center">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>

        <div className="container relative z-0 flex-col flex justify-center text-center">
          <div className="lg:text-6xl md:text-5xl text-4xl font-extrabold lg:flex justify-center text-center">
            <div className="text-white pr-2">Estimated </div>
            <div className="text-[#F3B320]"> Time Since Death</div>
          </div>
          <div className="flex justify-center w-full pt-2 pb-6">
            <div className="text-center justify-center  text-white lg:text-3xl text-xl py-6 lg:w-[55%] px-5">
              <b>Expert system for estimating time since death</b> that using
              previous research cases and the experience of an expert
            </div>
          </div>

          <div className="">
            <Link to="/corpse_data">
              <button className="bg-[#F3B320] rounded-md text-white py-4 px-10">
                Start The Test
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
