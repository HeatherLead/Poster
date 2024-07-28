"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Poppins } from "next/font/google";
import {
  Button,
  DropdownMenu,
  IconButton,
  Slider,
  Skeleton,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import axios from "axios";

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

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [priceBar, setPriceBar] = useState([0, 1000]);
  const [type, setType] = useState("Shop");
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const setOrder = useCallback((order: string) => {
    setSortOrder(order);
  }, []);

  const setPrice = useDebouncedCallback((low: number, high: number) => {
    setPriceBar([low, high]);
  }, 300);

  const searchItem = useDebouncedCallback((params: string) => {
    setSearchParams(params);
  }, 500);

  const setCategory = useCallback((type: string) => {
    setType(type);
  }, []);

  const filteredItems = useMemo(() => {
    let filtered = products.filter(
      (item) => item.price >= priceBar[0] && item.price <= priceBar[1]
    );

    if (searchParams) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchParams.toLowerCase())
      );
    }

    if (type !== "Shop") {
      filtered = filtered.filter((item) => item.Itemtype === type);
    }

    if (sortOrder) {
      filtered.sort((a, b) =>
        sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    return filtered;
  }, [products, priceBar, type, sortOrder, searchParams]);

  return (
    <div className={`${poppins.className} overflow-hidden p-5`}>
      <div className="flex justify-center w-full items-start pt-20 gap-5">
        <div className="hidden lg:block lg:w-1/4 p-10">
          <div className="flex gap-3 mb-10">
            <input
              className="p-2 border focus:outline-none"
              type="text"
              placeholder="Search Product"
              onChange={(e) => searchItem(e.target.value)}
            />
            <IconButton style={{ cursor: "pointer" }} size={"3"} color="grass">
              <MagnifyingGlassIcon width="24" height="24" />
            </IconButton>
          </div>
          <div>
            <h1 className="text-2xl mb-5">Filter by Price</h1>
            <Slider
              onValueChange={(e) => setPrice(e[0] * 10, e[1] * 10)}
              defaultValue={priceBar}
              radius="full"
              color="grass"
            />
            <div className="flex p-5 justify-end items-center gap-4">
              <input
                placeholder={`₹ ${priceBar[0]}`}
                className="p-2 border focus:outline-none w-20 rounded-md h-10"
                type="text"
                value={priceBar[0]}
                readOnly
              />
              <input
                placeholder={`₹ ${priceBar[1]}`}
                className="p-2 border focus:outline-none w-20 rounded-md h-10"
                type="text"
                value={priceBar[1]}
                readOnly
              />
            </div>
          </div>
          <div className="mt-20">
            <h1 className="text-xl text-[#74a84a]">Categories</h1>
            <div className="ml-5 mt-5">
              <h2
                onClick={() => setCategory("Postcard")}
                className="text-[#74a84a] cursor-pointer pb-1"
              >
                Postcards <span className="text-black">(6)</span>
              </h2>
              <h2
                onClick={() => setCategory("Poster")}
                className="text-[#74a84a] cursor-pointer pb-1"
              >
                Posters<span className="text-black">(6)</span>
              </h2>
              <h2
                onClick={() => setCategory("Shop")}
                className="text-[#74a84a] cursor-pointer pb-1"
              >
                All<span className="text-black">(12)</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/4 p-10 border-l">
          <h2 className="text-zinc-600 text-sm">Home / Shop</h2>
          <h1 className="text-6xl mt-14 text-[#74a84a]">{type}</h1>
          <div className="flex justify-between items-center pt-20 pb-10">
            <h1 className="text-zinc-600">
              Showing all {filteredItems.length} results
            </h1>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button
                  variant="outline"
                  color="gray"
                  highContrast={true}
                  style={{ padding: 14, cursor: "pointer" }}
                >
                  Sorting
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content color="gray" highContrast={true}>
                <DropdownMenu.Item onSelect={() => setOrder("lowToHigh")}>
                  Price: low to high
                </DropdownMenu.Item>
                <DropdownMenu.Item onSelect={() => setOrder("highToLow")}>
                  Price: high to low
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
          <div className="flex flex-wrap justify-start items-center gap-5 overflow-hidden">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-[40%] md:w-[30%] grid gap-2 p-5 sm:p-2"
                  >
                    <Skeleton height={"260px"} />
                    <Skeleton height={"15px"} width={"60px"} />
                    <Skeleton height={"15px"} width={"80px"} />
                    <Skeleton height={"15px"} width={"60px"} />
                  </div>
                ))
              : filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="w-full sm:w-[40%] md:w-[30%] grid gap-2 p-5 sm:p-2"
                  >
                    <Link href={`/shop/${item.Itemtype}/${item.id}`}>
                      <img className="cursor-pointer" src={item.image} alt="" />
                    </Link>
                    <span className="text-zinc-400 font-thin">
                      {item.Itemtype}
                    </span>
                    <h1
                      className={`text-lg ${poppins.className} cursor-pointer`}
                    >
                      {item.title}
                    </h1>
                    <span className="font-bold text-zinc-500">{`₹${item.price}`}</span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
