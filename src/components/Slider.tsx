"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const data = [ // Dữ liệu mẫu cho slider
  {
    id: 1,
    title: "Bộ sưu tập vòng cổ đến từ Italia",
    image: "/slide1.jpg", // Đường dẫn ảnh cho slide 1
  },
  {
    id: 2,
    title: "Cặp nhẫn cưới cổ điển được sử bán nhiều nhất",
    image: "/slide2.jpg", // Đường dẫn ảnh cho slide 2
  },
  {
    id: 3,
    title: "Món hàng đắt giá luôn được mang trên những người quý phái",
    image: "/slide4.jpg", // Đường dẫn ảnh cho slide 3
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // State để lưu index của slide hiện tại

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)), // Tự động chuyển slide sau mỗi 4 giây
      4000
    );
    return () => clearInterval(interval); // Clear interval khi component unmount
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-orange-600 font-bold">
        <h1 className="text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          {data[currentSlide].title}
        </h1>
        <button className="bg-yellow-500 text-white py-4 px-8">Đặt hàng ngay</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
