"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const SuccessPage = () => {
  const router = useRouter(); // Sử dụng useRouter để điều hướng trang
  const searchParams = useSearchParams(); // Lấy searchParams từ URL query
  const payment_intent = searchParams.get("payment_intent");// Lấy giá trị payment_intent từ query parameter "payment_intent"

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
          method: "PUT",// Gửi yêu cầu PUT đến endpoint để xác nhận thanh toán với payment_intent
        });
        setTimeout(() => {
          router.push("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();// Gọi hàm makeRequest khi component được render hoặc khi payment_intent thay đổi
  }, [payment_intent, router]);// useEffect được gọi lại khi payment_intent hoặc router thay đổi

  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">
          Thanh toán thành công. Vui lòng đợi chuyển sang trang đặt hàng!
        </p>
      <ConfettiExplosion className="absolute m-auto"
      />
      </div>
    </>
  );
};

export default SuccessPage;
