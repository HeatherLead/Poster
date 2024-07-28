import Link from "next/link";
import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const robotoBold = Roboto({
  weight: "700",
  subsets: ["latin"],
});
const Footer = () => {
  return (
    <div className=" flex justify-evenly items-center p-8 flex-wrap ">
      <div className={`${roboto.className} flex gap-4 text-sm`}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <h1
        className={`${robotoBold.className} font-bold text-xl tracking-[.2rem]`}
      >
        EARTH STORE
      </h1>
      <span className={`${roboto.className} `}>
        Copyright © 2024 Planet Earth Store
      </span>
    </div>
  );
};

export default Footer;
