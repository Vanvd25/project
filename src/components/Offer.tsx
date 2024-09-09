import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";
//hiển thị khuyến mãi
const Offer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-yellow-400 text-5xl font-bold xl:text-6xl">Siêu giảm giá, quá hờiii</h1>
        <p className="text-yellow-400 xl:text-xl">
        Chào mừng đại lễ, giảm giá cực sốc đến 99% giá trị sản phẩm.
        Ngẫu nhiên mua 1 tặng 1 cho những khách hàng may mắn. Cùng đếm ngược nào!
        </p>
        <CountDown/>
        <button className="bg-orange-600 text-white text-2xl rounded-md py-3 px-6">Đặt hàng ngay</button>
      </div>
      
      <div className="flex-1 w-full relative md:h-full">
        <Image src="/giamgia1.jpg" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;
