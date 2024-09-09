"use client"
import React, { useState, useEffect } from "react";

const CountDown = () => {
  
  let difference = +new Date(`11/07/2024`) - +new Date();
  const [delay, setDelay] = useState(difference);

   // Tính toán số ngày, giờ, phút, giây từ khoảng thời gian còn lại
  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const m = Math.floor((difference / 1000 / 60) % 60);
  const s = Math.floor((difference / 1000) % 60);

  useEffect(() => {
    // Sử dụng useEffect để thiết lập interval để cập nhật state delay mỗi giây
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    // Xử lý khi delay đạt giá trị 0, dừng interval
    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });
  return (
    <span className="font-bold text-5xl text-yellow-300">
      {d}:{h}:{m}:{s}
    </span>
  );
};

export default CountDown;