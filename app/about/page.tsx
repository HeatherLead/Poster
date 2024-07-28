import React from "react";
import about from "../assets/about.jpg";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Footer from "../Footer";
const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const About = () => {
  return (
    <div className=" overflow-hidden">
      <div className=" bg-[url('./assets/Banner.jpg')] bg-cover w-screen h-[65vh] flex justify-center items-center pb-28">
        <h1 className=" text-center text-4xl sm:text-7xl font-medium text-[#2c541d] tracking-[.5rem]">
          WHO ARE WE?
        </h1>
      </div>
      <div className=" flex justify-center items-center gap-14 flex-wrap p-24  ">
        <img className=" p-8 w-1/2 " src={about.src} alt="" />
        <div className=" w-[37%] flex justify-evenly gap-8 flex-col">
          <h1 className={`${poppins.className}  text-4xl`}>OUR MISSION</h1>
          <p className=" text-[17px] text-zinc-500">
            Hello, my name is Ayush Bangar and with the help of many people I
            made this template. I made it so it is super easy to update and so
            that it flows perfectly with my tutorials. Lots of love and hundreds
            of hours went into making it. I hope you love it as much as I do.
          </p>
          <p className=" text-[17px] text-zinc-500">
            I wish you the best of luck with your business, enjoy the adventure.
          </p>
        </div>
      </div>

      <div className="bg-[url('./assets/Talk-to-us.jpg')] h-[70vh] bg-cover  flex justify-center items-center flex-col">
        <h1 className=" text-center text-2xl  sm:text-4xl font-medium  tracking-widest pb-5">
          Give the Gift of a Postcard
        </h1>
        <h2 className=" text-md tracking-wider  pb-10">
          Give the gift of a lasting memory with a postcard
        </h2>
        <Link
          className=" py-3 px-10 bg-[#74a84a] text-white tracking-[.1rem]"
          href="/shop"
        >
          PURCHASE A POSTCARD
        </Link>
      </div>
    </div>
  );
};

export default About;
