"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";

const links = [
  { id: 1, title: "Homepage", url: "/" }, // Định nghĩa đường dẫn và tiêu đề cho trang chủ
  { id: 2, title: "Menu", url: "/menu" }, // Định nghĩa đường dẫn và tiêu đề cho trang Menu
  { id: 3, title: "Working Hours", url: "/" }, // Định nghĩa đường dẫn và tiêu đề cho trang Working Hours (Giờ làm việc)
  { id: 4, title: "Contact", url: "/" }, // Định nghĩa đường dẫn và tiêu đề cho trang Contact (Liên hệ)
];


const Menu = () => {
  const [open, setOpen] = useState(false);// Sử dụng useState để quản lý trạng thái mở/đóng của menu

  // TEMPORARY
  const user = false;// Biến tạm thời để xác định trạng thái người dùng (đã đăng nhập hay chưa)

  return (
    <div>
      {/* LONG WAY */}
      {/* {!open ? (
        <Image
          src="/open.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src="/close.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )} */}
      
      {/* SHORTCUT */}
      <Image
        src={open ? "/close.png" : "/open.png"}
        alt=""
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />
      {open && (
        <div className="bg-orange-600 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}

          {/* LONG WAY */}
          {/* {!user ? (
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          ) : (
            <Link href="/orders" onClick={() => setOpen(false)}>
              Orders
            </Link>
          )} */}

          {/* SHORTCUT */}
          <Link
            href={user ? "/orders" : "login"}
            onClick={() => setOpen(false)}
          >
            {user ? "Orders" : "Login"}
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
