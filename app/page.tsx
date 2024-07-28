import Link from "next/link";
import { Roboto, Jost } from "next/font/google";
import { FaQuoteLeft, FaLock, FaBox, FaHandHoldingHeart } from "react-icons/fa";
import prisma from "@/prisma/Client";

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});
const robotoLight = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const jost = Jost({ subsets: ["latin"], weight: "600" });
interface ExtraDetail {
  FramedWithoutBorders: string[];
  FramedWithBordersAcrylicGlass: string[];
}
interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  extraDetail: ExtraDetail;
  image: string;
}
interface TestimonialData {
  name: string;
  review: string;
  imageURL: string;
  Itemtype: "Poster" | "Postcard";
}

export default function Home() {
  return (
    <>
      <div className="bg-[url('./assets/Banner.jpg')] h-[80vh] bg-cover  flex justify-center items-center flex-col">
        <h1
          className={`${roboto.className} text-6xl  sm:text-8xl  text-[#2c541d] tracking-widest pb-5`}
        >
          EARTH
        </h1>

        <h2 className=" text-2xl tracking-wider sm:text-4xl sm:tracking-[.3rem] font-light pb-10">
          MULTIPURPOSE STORE
        </h2>
        <Link
          className=" py-3 px-14 bg-[#74a84a] text-white tracking-[.1rem]"
          href="/shop"
        >
          SHOP NOW
        </Link>
      </div>
      <Quickbuy />
      <hr />
      <Testimonial />

      <div className="bg-[url('./assets/Banner.jpg')] h-[70vh] bg-cover  flex justify-center items-center flex-col">
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
      <Benifits />
    </>
  );
}

const Quickbuy = async () => {
  try {
    const data = await prisma.product.findMany();
    return (
      <div className=" flex flex-wrap justify-center items-center p-5 sm:p-20 gap-2">
        {data.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className=" w-full sm:w-[29%] grid gap-2  p-5 sm:p-2 "
          >
            <Link href={`/shop/${item.Itemtype}/${item.id}`}>
              <img className="" src={item.image} alt="" />
            </Link>
            <span className=" text-zinc-400 font-thin ">{item.Itemtype}</span>
            <Link href={`/shop/${item.Itemtype}/${item.id}`}>
              <h1 className={`text-lg ${roboto.className}`}>{item.title}</h1>
            </Link>
            <span className=" font-bold text-zinc-500">{`₹${item.price}`}</span>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    return <div>error occured</div>;
  }
};

const Testimonial = () => {
  return (
    <div className=" p-5 sm:p-32">
      <h1 className={` text-3xl sm:text-5xl pb-20 ${jost.className}`}>
        What our customers say
      </h1>
      <div className=" flex justify-evenly items-center flex-wrap gap-14 sm:gap-20">
        {TestimonialData.map((item, index) => (
          <div className=" w-full sm:w-[28%]" key={index}>
            <span>
              <FaQuoteLeft className=" text-2xl text-[#2c541d] mb-5 " />
            </span>
            <p className={`${robotoLight.className} text-lg`}>{item.review}</p>
            <img
              className=" w-9 aspect-square m-4 ml-0 rounded-full"
              src={item.imageURL}
              alt=""
            />
            <h1 className={`${roboto.className} text-xs tracking-widest`}>
              {item.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialData = [
  {
    name: "JENNIFER LEWIS",
    review:
      "Fast shipping and excellent customer service. The product was even better than expected. I will definitely be a returning customer.",
    imageURL: "https://picsum.photos/id/65/100",
  },
  {
    name: "JUAN CARLOS",
    review:
      "Thank you for the excellent shopping experience. It arrived quickly and was exactly as described. I will definitely be shopping with you again in the future.",
    imageURL: "https://picsum.photos/id/22/100",
  },
  {
    name: "ALICIA HEART",
    review:
      "Great user experience on your website. I found exactly what I was looking for at a great price. I will definitely be telling my friends.",
    imageURL: "https://picsum.photos/id/64/100",
  },
];

const Benifits = () => {
  return (
    <div className=" p-20 flex justify-evenly items-center flex-wrap gap-10">
      <div className=" flex justify-start sm:justify-center items-center gap-5  md:border-r w-full sm:w-[30%] ">
        <div className=" w-10 aspect-square rounded-full bg-[#2c541d] flex justify-center items-center">
          <FaLock className=" text-white" />
        </div>
        <div>
          <h1 className=" text-md  font-medium tracking-widest ">
            SECURE PAYMENT
          </h1>
          <p className=" text-sm mt-1">All our payments are SSL secured</p>
        </div>
      </div>
      <div className=" flex justify-start sm:justify-center items-center gap-5  md:border-r w-full sm:w-[30%] ">
        <div className=" w-10 aspect-square rounded-full bg-[#2c541d] flex justify-center items-center">
          <FaBox className=" text-white" />
        </div>
        <div>
          <h1 className=" text-md  font-medium tracking-widest ">
            DELIVERED WITH CARE
          </h1>
          <p className=" text-sm mt-1">Super fast shipping to your door</p>
        </div>
      </div>
      <div className=" flex justify-start sm:justify-center  items-center gap-5  w-full  sm:w-[30%]  ">
        <div className=" w-10 aspect-square rounded-full bg-[#2c541d] flex justify-center items-center">
          <FaHandHoldingHeart className=" text-white" />
        </div>
        <div>
          <h1 className=" text-md  font-medium tracking-widest ">
            EXCELLENT SERVICE
          </h1>
          <p className=" text-sm mt-1">Live chat and phone support</p>
        </div>
      </div>
    </div>
  );
};
