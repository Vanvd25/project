import Link from "next/link";
import React from "react";

// Component Footer: Hiển thị phần chân trang của trang web
const Footer = () => {
  return (
    <div className="h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-orange-600 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl">Vàng Bạc Đá Quý</Link>
      <p>©Đồ án chuyên ngành A</p>
    </div>
  );
};

export default Footer;