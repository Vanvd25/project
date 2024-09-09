"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! // Tải khóa công khai Stripe từ biến môi trường NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PayPage = ({ params }: { params: { id: string } }) => {
  const [clientSecret, setClientSecret] = useState(""); // Khởi tạo state clientSecret để lưu trữ mã bí mật của client

  const { id } = params; // Lấy id từ props params

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/create-intent/${id}`, // Gửi yêu cầu tạo intent đến API với id của đơn hàng
          {
            method: "POST", // Phương thức POST để tạo intent
          }
        );
        const data = await res.json(); // Chuyển đổi dữ liệu nhận được thành định dạng JSON
        setClientSecret(data.clientSecret); // Lưu trữ clientSecret từ dữ liệu nhận được
      } catch (err) {
        console.log(err); // Xử lý lỗi nếu có
      }
    };

    makeRequest(); // Gọi hàm makeRequest khi id thay đổi
  }, [id]); // useEffect sẽ chạy lại khi id thay đổi

  const options: StripeElementsOptions = {
    clientSecret, // Truyền clientSecret vào các tùy chọn StripeElementsOptions
    appearance: {
      theme: "stripe", // Đặt giao diện cho thanh toán là "stripe"
    },
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default PayPage;
