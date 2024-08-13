import React from "react";
import { IoMailOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebookF, FaLinkedinIn, FaPlay, FaTwitter } from "react-icons/fa";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: "600",
  subsets: ["latin"],
});
const Contact = () => {
  return (
    <div className=" overflow-hidden">
      <div className=" bg-[url('./assets/Banner.jpg')] bg-cover w-screen h-[62vh] flex justify-center items-center pb-28">
        <h1 className=" text-center text-4xl sm:text-7xl font-medium text-[#2c541d] tracking-[.5rem]">
          CONTACT US
        </h1>
      </div>
      <main className="md:p-32 flex justify-center items-center gap-20">
        <section id="contact-us" className="w-[45%]">
          <h2 className={`${poppins.className} text-3xl font-bold mb-4`}>
            Get In Touch
          </h2>
          <div>
            <form className="grid gap-6 p-10 shadow-lg">
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-4 border border-gray-300 focus:outline-none "
                placeholder="Full name"
              />

              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full p-4 border border-gray-300 focus:outline-none "
                placeholder="Phone Number"
              />

              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-4 border border-gray-300 focus:outline-none "
                placeholder="Email"
              />

              <textarea
                id="message"
                name="message"
                required
                className="w-full p-4 border border-gray-300 h-32 focus:outline-none "
                placeholder="Message"
              ></textarea>

              <button
                type="submit"
                className="bg-[#74a84a] text-white p-2  text-lg tracking-widest hover:bg-[#2c541d] w-40"
              >
                SEND NOW
              </button>
            </form>
          </div>
        </section>
        <section className=" w-[45%]">
          <h2 className={`${poppins.className} text-3xl font-bold mb-4`}>
            Talk To Us
          </h2>
          <div className=" p-10 pl-0 grid gap-10">
            <div className=" flex gap-5 items-start ">
              <div className=" w-12 aspect-square rounded-full border border-[#74a84a] flex justify-center items-center text-xl">
                <IoMailOutline />
              </div>
              <div>
                <h1 className=" p-1">EMAIL</h1>
                <p className="p-1 text-2xl   text-[#2c541d]">
                  Ayushbangar04@gmail.com
                </p>
              </div>
            </div>
            <div className=" flex gap-5 items-start ">
              <div className=" w-12 aspect-square rounded-full border border-[#74a84a] flex justify-center items-center text-xl">
                <FiPhoneCall />
              </div>
              <div>
                <h1 className=" p-1">PHONE NUMBER</h1>
                <p className="p-1 text-2xl  text-[#2c541d]">123-4567-890</p>
              </div>
            </div>
            <div className=" flex gap-5 items-start ">
              <div className=" w-12 aspect-square rounded-full border border-[#74a84a] flex justify-center items-center text-2xl">
                <CiLocationOn />
              </div>
              <div>
                <h1 className=" p-1">ADDRESS</h1>
                <p className="p-1 text-2xl   text-[#2c541d]">
                  2727 Ocean Road,
                </p>
                <p className="p-1 text-2xl   text-[#2c541d]">
                  Malibu, CA, 90264
                </p>
              </div>
            </div>
          </div>
          <div>
            <h1 className=" text-2xl font-medium">Follow us:</h1>
            <div className=" flex gap-2 mt-5">
              <div className=" w-8 aspect-square rounded-full  bg-[#74a84a] flex justify-center items-center text-white text-xl">
                <FaFacebookF />
              </div>
              <div className=" w-8 aspect-square rounded-full  bg-[#74a84a] flex justify-center items-center text-white text-xl">
                <FaTwitter />
              </div>
              <div className=" w-8 aspect-square rounded-full  bg-[#74a84a] flex justify-center items-center text-white text-xl">
                <FaLinkedinIn />
              </div>
              <div className=" w-8 aspect-square rounded-full  bg-[#74a84a] flex justify-center items-center text-white text-lg">
                <FaPlay />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
