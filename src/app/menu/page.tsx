import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";
// Hàm lấy dữ liệu danh mục từ API
const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store"
  })

  if (!res.ok) {
    throw new Error("Failed!");

  }

  return res.json()
}

const MenuPage = async () => {

  const menu: MenuType = await getData()// Lấy dữ liệu menu từ hàm getData
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="relative block w-full h-1/3 bg-cover p-8 md:h-1/2"
          style={{ backgroundImage: `url(${category.img})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
        >
          <div className={`text-${category.color} w-full h-full flex flex-col justify-between pl-10 pr-10`}>
            <div>
              <h1 className="uppercase font-bold text-3xl text-white">{category.title}</h1>
              <p className="text-sm text-left text-white my-8">{category.desc}</p>
            </div>
            <div></div>{/* Đây là phần trống bên phải */}
            {/* <div className="text-right">
              <button className={`bg-opacity-0 border-2 text-white ${category.color} text-${category.color === "red" ? "blue" : "blue-500"} py-2 px-4 rounded-md`}>Tới ngay</button>
            </div> */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
