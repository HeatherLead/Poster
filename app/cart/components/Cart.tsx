"use client";
import { useEffect, useState } from "react";
import { InfoCircledIcon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Table, Avatar, Callout, Skeleton } from "@radix-ui/themes";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";

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

const Cart = ({ setSubTotal }: { setSubTotal: (subTotal: number) => void }) => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<dataModel[]>([]);
  const [productDetails, setProductDetails] = useState<Product[]>([]);

  const fetchCartAndProductDetails = async () => {
    try {
      const cartResponse = await axios.get("/api/cart");
      const cartItems: dataModel[] = cartResponse.data;
      setCartItems(cartItems);
      if (cartItems.length > 0) {
        const productIds = cartItems.map((item) => item.productId);
        const productDetails = await Promise.all(
          productIds.map(async (productId) => {
            try {
              const response = await axios.get(`/api/products/${productId}`);
              return response.data as Product;
            } catch (error) {
              console.error(
                "Error fetching product details for",
                productId,
                error
              );
            }
          })
        );

        setProductDetails(productDetails.filter(Boolean) as Product[]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartAndProductDetails();
  }, []);

  useEffect(() => {
    const subTotal = cartItems.reduce((total, item) => {
      const product = productDetails.find(
        (product) => product.id === item.productId
      );
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
    setSubTotal(subTotal);
  }, [cartItems, productDetails, setSubTotal]);

  const updateCart = async () => {
    setLoading(true);
    await fetchCartAndProductDetails();
    setLoading(false);
  };

  const removeItem = async (cartId: string) => {
    try {
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== cartId)
      );

      const response = await axios.post("/api/cart/removeItem", {
        cartId,
      });
    } catch (error) {}
  };

  const removeQuantity = async (cartId: string) => {
    try {
      const response = await axios.post("/api/cart/reduceQuantity", {
        cartId,
      });
      updateCart();
    } catch (error) {}
  };
  const addQuantity = async (cartId: string) => {
    try {
      const response = await axios.post("/api/cart/addQuantity", {
        cartId,
      });
      updateCart();
    } catch (error) {}
  };

  if (!cartItems) {
    return (
      <div>
        <Callout.Root variant="outline" style={{ marginBottom: "20px" }}>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>Login to Access Cart</Callout.Text>
        </Callout.Root>
      </div>
    );
  }

  if (loading) {
    return (
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Cancel</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Subtotal</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Skeleton width={"20px"} height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Avatar fallback />
            </Table.Cell>
            <Table.Cell>
              <Skeleton width={"80px"} height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton width={"80px"} height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton width={"80px"} height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton width={"80px"} height="20px" />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Skeleton width={"20px"} height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Avatar fallback />
            </Table.Cell>
            <Table.Cell>
              <Skeleton width={"80px"} height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton width={"80px"} height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton width={"80px"} height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton width={"80px"} height="20px" />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <Callout.Root variant="outline" style={{ marginBottom: "20px" }}>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>Your cart is empty.</Callout.Text>
        </Callout.Root>
      </div>
    );
  }

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Cancel</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Subtotal</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {cartItems.map((item, index) => {
          const productDetail = productDetails.find(
            (detail) => detail.id === item.productId
          );

          if (!productDetail) {
            return (
              <Table.Row key={index}>
                <Table.Cell colSpan={6}>Product not found</Table.Cell>
              </Table.Row>
            );
          }

          return (
            <Table.Row key={index}>
              <Table.Cell
                className=" cursor-pointer"
                onClick={() => {
                  removeItem(item.id);
                }}
              >
                <MdOutlineCancel size={25} color="#74a84a" />
              </Table.Cell>
              <Table.Cell>
                <Link
                  href={`/shop/${productDetail.Itemtype}/${productDetail.id}`}
                >
                  <Avatar src={productDetail.image} fallback />
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link
                  className=" text-lg text-[#74a84a]"
                  href={`/shop/${productDetail.Itemtype}/${productDetail.id}`}
                >
                  {productDetail.title}
                </Link>
              </Table.Cell>
              <Table.Cell>{productDetail.price}</Table.Cell>
              <Table.Cell>
                <section className=" border flex h-full w-fit items-center ">
                  <label
                    onClick={() => {
                      removeQuantity(item.id);
                    }}
                    className=" w-10 h-10 flex justify-center items-center border-r cursor-pointer"
                  >
                    <MinusIcon color="#74a84a" />
                  </label>
                  <input
                    className=" h-10 w-10  focus:outline-none text-center"
                    type="number"
                    defaultValue={item.quantity}
                  />
                  <label
                    onClick={() => {
                      addQuantity(item.id);
                    }}
                    className=" w-10 h-10 flex justify-center items-center border-l cursor-pointer"
                  >
                    <PlusIcon color="#74a84a" />
                  </label>
                </section>
              </Table.Cell>
              <Table.Cell>{`₹ ${
                productDetail.price * item.quantity
              }`}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default Cart;
