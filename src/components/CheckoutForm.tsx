"use client";

import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"; // Import các thành phần từ Stripe React để tích hợp thanh toán

import { useEffect, useState } from "react"; 
import AddressForm from "./AddressForm"; // Import component AddressForm từ file AddressForm.tsx
 
const CheckoutForm = () => {
  const stripe = useStripe(); // Sử dụng hook useStripe từ Stripe React để lấy đối tượng stripe
  const elements = useElements(); // Sử dụng hook useElements từ Stripe React để lấy các phần tử thanh toán

  const [email, setEmail] = useState(""); // State lưu địa chỉ email của người dùng
  const [message, setMessage] = useState<string | null>(null); // State lưu thông báo thành công hoặc lỗi
  const [isLoading, setIsLoading] = useState(false); // State để điều khiển hiển thị trạng thái tải

  useEffect(() => {
    if (!stripe) {
      return; // Nếu stripe chưa sẵn sàng, dừng hàm useEffect
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return; // Nếu không có clientSecret trong query params, dừng hàm useEffect
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Thanh toán thành công!"); // Nếu thanh toán thành công, set thông báo
          break;
        case "processing":
          setMessage("Đang xử lý thanh toán của bạn."); // Nếu đang xử lý thanh toán, set thông báo
          break;
        case "requires_payment_method":
          setMessage(
            "Thanh toán của bạn không thành công, vui lòng thử lại."
          ); // Nếu cần phương thức thanh toán mới, set thông báo
          break;
        default:
          setMessage("Đã xảy ra lỗi."); // Nếu trạng thái thanh toán không rõ ràng, set thông báo lỗi
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    if (!stripe || !elements) {
      return; // Nếu stripe hoặc elements chưa sẵn sàng, dừng hàm handleSubmit
    }

    setIsLoading(true); // Đặt isLoading là true để hiển thị trạng thái tải

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
    });

    // Xử lý kết quả từ stripe.confirmPayment()
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "Đã xảy ra lỗi!"); // Nếu có lỗi từ Stripe, set thông báo lỗi
    } else {
      setMessage("Đã xảy ra lỗi không mong muốn."); // Nếu có lỗi không xác định, set thông báo lỗi
    }

    setIsLoading(false); // Dừng hiển thị trạng thái tải trên giao diện
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] p-4 lg:px-20 xl:px-40 flex flex-col gap-8"
    >
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <AddressForm />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="bg-orange-600 text-white p-4 rounded-md w-28">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;