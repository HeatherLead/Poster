"use client";
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import {
  Avatar,
  Box,
  Callout,
  Flex,
  Link,
  Skeleton,
  Table,
} from "@radix-ui/themes";
import Cart from "./components/Cart";
const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});
interface dataModel {
  id: string;
  productId: string;
  quantity: number;
  userId: string;
}

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

const page = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  return (
    <div className={`lg:p-20 ${poppins.className}`}>
      <h1 className=" text-3xl my-5">Cart</h1>
      <Cart setSubTotal={setSubTotal} />

      <Flex justify={"start"} my={"5"} gap={"5"} align={"center"}>
        <Box>
          <input
            type="text"
            placeholder="Coupon Code"
            className=" h-9 pl-2 border focus:outline-none"
            onChange={(e) => {
              setCoupon(e.target.value);
            }}
            value={coupon}
          />
        </Box>
        <Box>
          <button
            onClick={() => {
              setCoupon("");
              if (coupon == "earth40") {
                setDiscount(40);
              }
            }}
            className=" py-2 px-4 bg-[#74a84a] text-white tracking-widest"
          >
            APPLY COUPON
          </button>
        </Box>
      </Flex>

      <Flex justify={"end"} align={"center"}>
        <Checkout subTotal={subTotal} discount={discount} />
      </Flex>
    </div>
  );
};

export default page;

const Checkout = ({
  subTotal,
  discount,
}: {
  subTotal: number;
  discount: number;
}) => {
  return (
    <Table.Root className=" md:w-1/2 " variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Cart Totals</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Sub Total</Table.Cell>
          <Table.Cell>{`₹ ${subTotal}`}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Discount</Table.Cell>
          <Table.Cell>{`₹ ${discount}`}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Total</Table.Cell>
          <Table.Cell>{`₹ ${Math.max(subTotal - discount, 0)}`}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            <Link href="/cart/checkout">
              <h1 className=" bg-[#74a84a] hover:bg-[#2c541d] transition-colors duration-200 m-2 py-4 px-5 text-xl w-fit text-white tracking-widest cursor-pointer">
                PROCEED TO CHECKOUT
              </h1>
            </Link>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};
