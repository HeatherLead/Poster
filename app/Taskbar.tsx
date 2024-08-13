import Link from "next/link";
import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import Authentication from "./components/Authentication";
const Taskbar = () => {
  return (
    <div className=" hidden  bg-[url('./assets/Banner.jpg')] bg-cover sm:flex justify-around items-center p-10">
      <h1 className=" text-2xl font-bold">EARTH STORE</h1>
      <div className=" flex justify-evenly items-center gap-10">
        <Link className=" text-[#74a84a] text-lg" href="/">
          HOME
        </Link>
        <Link className=" text-[#74a84a] text-lg" href="/about">
          ABOUT
        </Link>
        <Link className=" text-[#74a84a] text-lg" href="/shop">
          SHOP
        </Link>
        <Link className=" text-[#75ab49] text-lg" href="/contact">
          CONTACT
        </Link>
        <Link className=" text-2xl" href="/cart">
          <FaShoppingBag />
        </Link>
        <Authentication />
      </div>
    </div>
  );
};

export default Taskbar;
