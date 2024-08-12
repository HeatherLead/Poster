"use client";
import React, { useEffect, useState } from "react";
import { notFound, redirect, useParams } from "next/navigation";
import { PlusIcon, MinusIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Poppins, Roboto } from "next/font/google";
import {
  Avatar,
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Skeleton,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

interface Product {
  id: string;
  Itemtype: string;
  description: string;
  title: string;
  id_: number;
  image: string;
  price: number;
  extraDetail: {
    FramedWithBordersAcrylicGlass: string[];
    FramedWithoutBorders: string[];
    PaperTypeMatte: string[];
  };
}

interface ExtraDetail {
  FramedWithoutBorders?: string[];
  PaperTypeMatte?: string[];
  FramedWithBordersAcrylicGlass: string[];
}

const CartButton = ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const router = useRouter();
  const { status, data: session } = useSession();
  if (status == "unauthenticated")
    return (
      <button
        onClick={() => {
          router.push("/api/auth/signin");
        }}
        className=" py-2 px-6 w-fit bg-[#74a84a] hover:bg-[#2c541d] text-white tracking-[.3rem] cursor-pointer"
      >
        Login
      </button>
    );
  if (status == "loading") return <Skeleton />;
  const addItem = async (productId: string, quantity: number) => {
    try {
      const { status, data } = await axios.post("/api/cart/addItemToCart", {
        productId: productId,
        quantity: quantity,
      });
      if (status == 200) {
        router.push("/shop");
      }
      console.log(data);
    } catch (error) {
      console.log("an error occured while adding item to cart");
    }
  };
  return (
    <button
      onClick={() => {
        addItem(productId, quantity);
      }}
      className=" py-2 px-6 w-fit bg-[#74a84a] hover:bg-[#2c541d] text-white tracking-[.3rem] cursor-pointer"
    >
      ADD TO CART
    </button>
  );
};

const Item = () => {
  const { id } = useParams();
  const [data, setData] = useState<Product | null>(null);
  const [itemNumber, setItemNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const { status, data: session } = useSession();
  const [user, serUser] = useState(session);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className=" flex justify-center items-start gap-10 flex-wrap mb-20  pt-20">
        <Skeleton className=" md:w-[40%] h-[400px]" />
        <div className=" md:w-[40%] flex flex-col gap-5">
          <Skeleton className=" text-zinc-600 w-40  h-5" />
          <Skeleton className=" text-[#74a84a] text-lg h-4 w-20" />
          <Skeleton className=" text-3xl h-10 w-32" />
          <Skeleton className=" text-2xl font-bold text-zinc-600 h-7 w-24" />
          <Skeleton className=" text-lg h-44" />
          <div className=" flex gap-10  items-center">
            <div className=" border flex h-full items-center ">
              <Skeleton className=" w-10 h-10 flex justify-center items-center border-r cursor-pointer" />

              <Skeleton className=" h-10 w-10  focus:outline-none text-center" />
              <Skeleton className=" w-10 h-10 flex justify-center items-center border-l cursor-pointer" />
            </div>
            <Skeleton />
          </div>
          <hr />
          <Skeleton className=" text-[#74a84a] text-lg h-4 w-20" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {data && (
        <div className={`p-20 ${roboto.className}`}>
          <div className=" flex justify-center items-start gap-10 flex-wrap mb-20 ">
            <img className=" md:w-[40%]" src={data.image} alt="" />
            <div className=" md:w-[40%] flex flex-col gap-5">
              <h1 className=" text-zinc-600">{`Home / ${data.Itemtype} / ${data.title}`}</h1>
              <h2 className=" text-[#74a84a] text-lg">{data.Itemtype}</h2>
              <h1 className=" text-3xl">{data.title}</h1>
              <p className=" text-2xl font-bold text-zinc-600">{`₹ ${data.price}`}</p>
              <p className=" text-lg">{data.description}</p>
              <div className=" flex gap-10  items-center">
                <div className=" border flex h-full items-center ">
                  <label
                    onClick={() => {
                      if (itemNumber == 1) {
                        return;
                      }
                      setItemNumber(itemNumber - 1);
                    }}
                    className=" w-10 h-10 flex justify-center items-center border-r cursor-pointer"
                  >
                    <MinusIcon />
                  </label>
                  <input
                    className=" h-10 w-10  focus:outline-none text-center"
                    type="number"
                    defaultValue={itemNumber}
                    value={itemNumber}
                    onChange={(e) => {
                      setItemNumber(Number(e.target.value));
                    }}
                  />
                  <label
                    onClick={() => {
                      setItemNumber(itemNumber + 1);
                    }}
                    className=" w-10 h-10 flex justify-center items-center border-l cursor-pointer"
                  >
                    <PlusIcon />
                  </label>
                </div>
                <CartButton productId={data.id} quantity={itemNumber} />
              </div>
              <hr />
              <span className=" flex gap-2">
                Category: <p className=" text-[#74a84a]">{data.Itemtype}</p>
              </span>
            </div>
          </div>
          <Tabs.Root defaultValue="description">
            <Tabs.List>
              <Tabs.Trigger style={{ cursor: "pointer" }} value="description">
                Description
              </Tabs.Trigger>
              <Tabs.Trigger style={{ cursor: "pointer" }} value="review">
                Review{" "}
              </Tabs.Trigger>
            </Tabs.List>
            <Box pt="3">
              <Tabs.Content value="description">
                {data.extraDetail && detailRenderer(data.extraDetail)}
              </Tabs.Content>
              <Tabs.Content value="review">
                <form className=" border p-5 text-zinc-600">
                  <h1>Add a Review</h1>
                  <Rating />
                  <h1>Your Review</h1>
                  <textarea className=" h-24 w-full border focus:outline-none  p-5" />

                  {user && (
                    <div>
                      <h2 className=" mt-5 mb-2">Review as :</h2>
                      <Box maxWidth="240px">
                        <Card>
                          <Flex gap="3" align="center">
                            <Avatar
                              size="3"
                              src={user.user!.image!}
                              radius="full"
                              fallback="T"
                            />
                            <Box>
                              <Text as="div" size="3" weight="bold">
                                {user.user?.name}
                              </Text>
                              <Text as="div" size="1">
                                {user.user?.email}
                              </Text>
                            </Box>
                          </Flex>
                        </Card>
                      </Box>
                    </div>
                  )}
                  <Button
                    style={{ cursor: "pointer" }}
                    type="submit"
                    size={"3"}
                    my={"4"}
                    color="grass"
                  >
                    Submit
                  </Button>
                </form>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
          <h1 className=" my-10 text-4xl font-bold">Related Products</h1>
          <RelatedProducts />
        </div>
      )}
    </div>
  );
};
export default Item;

const detailRenderer = (extraDetail: ExtraDetail) => {
  return (
    <ul className={`${poppins.className}`}>
      {Object.entries(extraDetail).map(([category, details], index) => (
        <li className="flex flex-col gap-3 pt-5 pb-5" key={index}>
          <strong className="text-zinc-600 text-lg">{category}:</strong>
          <ul className="ml-4">
            {details?.map((detail: string, idx: number) => (
              <li
                className="list-disc marker:text-zinc-600 text-zinc-600"
                key={idx}
              >
                {detail}
              </li>
            ))}
          </ul>
        </li>
      ))}
      <li className="pt-5 pb-5">
        <Callout.Root variant="outline">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            There may be a slight difference in actual color, due to the colors
            of display.
          </Callout.Text>
        </Callout.Root>
      </li>
    </ul>
  );
};

const Rating = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className=" flex gap-2 my-2 ">
      <p className=" text-xl">Your Rating * :</p>
      {Array.from({ length: 5 }, (_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rate"
              value={currentRating}
              onClick={() => setRating(currentRating)}
              style={{ display: "none" }}
            />
            <FaStar
              size={25}
              color={currentRating <= rating ? "#74a84a" : "grey"}
              style={{ cursor: "pointer" }}
            />
          </label>
        );
      })}
    </div>
  );
};

const RelatedProducts = () => {
  const [relatedData, setRelatedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/api/products");
        setRelatedData(data.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap items-center   mb-20 gap-2">
      {relatedData &&
        relatedData.slice(0, 3).map((item: Product) => (
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
};
