"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(product.price); // State lưu trữ tổng giá tiền sản phẩm
  const [quantity, setQuantity] = useState(1); // State lưu trữ số lượng sản phẩm
  const [selected, setSelected] = useState(0); // State lưu trữ lựa chọn của tùy chọn sản phẩm

  const { addToCart } = useCartStore(); // Sử dụng hook từ store để thêm sản phẩm vào giỏ hàng

  useEffect(()=>{
    useCartStore.persist.rehydrate(); // Sử dụng persist để tái cấu trúc giỏ hàng khi component được load lần đầu
  },[]);

  useEffect(() => {
    // Effect để tính lại tổng giá tiền khi số lượng sản phẩm hoặc lựa chọn tùy chọn sản phẩm thay đổi
    if (product.options?.length) {
      setTotal(
        quantity * product.price + product.options[selected].additionalPrice
      );
    }
  }, [quantity, selected, product]);

  const handleCart = () => {
    // Hàm xử lý khi người dùng nhấn nút thêm vào giỏ hàng
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }),
      quantity: quantity,
    });
    toast.success("Sản phẩm đã được thêm vào giỏ hàng!"); // Hiển thị thông báo thành công khi thêm vào giỏ hàng
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length &&
          product.options?.map((option, index) => (
            <button
              key={option.title}
              className="min-w-[6rem] p-2 ring-1 ring-black rounded-md"
              style={{
                background: selected === index ? "rgb(248 113 113)" : "white",
                color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-black">
          <span>Số lượng sản phẩm</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button
          className="uppercase w-56 bg-green-600 text-white p-3 ring-1 ring-white"
          onClick={handleCart}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default Price;
