"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { DropdownMenu, Skeleton } from "@radix-ui/themes";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import userIcon from "@/app/assets/userIcon.png";

const Authentication = () => {
  const { status, data: session } = useSession();
  const [image, setImage] = useState(userIcon.src);

  useEffect(() => {
    if (session?.user?.image) {
      setImage(session.user.image);
    }
  }, [session]);

  return (
    <>
      {status === "loading" && <Skeleton />}
      {status === "unauthenticated" && (
        <Link className="text-2xl" href="/api/auth/signin">
          <FaUser size={25} color="black" />
        </Link>
      )}
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <img
              className="w-9 rounded-full cursor-pointer"
              src={image}
              alt="User Avatar"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Log Out</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link href="/my-orders">My Orders</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </>
  );
};

export default Authentication;
