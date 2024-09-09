"use client";

import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession(); // Sử dụng hook useSession để lấy dữ liệu phiên người dùng và trạng thái phiên

  const router = useRouter(); // Sử dụng useRouter để điều hướng trang

  if (status === "unauthenticated") {
    router.push("/"); // Nếu chưa xác thực, điều hướng người dùng đến trang chủ
  }

  // Sử dụng useQuery để lấy dữ liệu đơn hàng từ API
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"], // Khóa truy vấn để quản lý cache
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()), // Hàm lấy dữ liệu từ API đơn hàng
  });

  const queryClient = useQueryClient(); // Sử dụng useQueryClient để quản lý cache và biến đổi dữ liệu

  // Sử dụng useMutation để cập nhật trạng thái đơn hàng
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT", // Phương thức PUT để cập nhật đơn hàng
        headers: {
          "Content-Type": "application/json", // Đặt kiểu nội dung là JSON
        },
        body: JSON.stringify(status), // Gửi dữ liệu trạng thái dưới dạng JSON
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Khi thành công, vô hiệu hóa truy vấn đơn hàng để cập nhật cache
    },
  });

  // Hàm xử lý cập nhật trạng thái đơn hàng
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement; // Lấy phần tử input từ form
    const status = input.value; // Lấy giá trị trạng thái từ input

    mutation.mutate({ id, status }); // Gọi hàm mutation để cập nhật trạng thái
    toast.success("Trạng thái đặt hàng đã được thay đổi!"); // Hiển thị thông báo thành công bằng toast
  };

  // Nếu đang tải hoặc trạng thái đang tải, hiển thị thông báo "Loading..."
  if (isLoading || status === "loading") return "Loading...";

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Mã Sản phẩm</th>
            <th>Ngày</th>
            <th>Giá</th>
            <th className="hidden md:block">Sản phẩm</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType) => (
            <tr className={`${item.status !== "delivered" && "bg-red-50"}`} key={item.id}>
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">{item.price}</td>
              <td className="hidden md:block py-6 px-1">
                {item.products[0].title}
              </td>
              {session?.user.isAdmin ? (
                <td>
                  <form
                    className="flex items-center justify-center gap-4"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <input
                      placeholder={item.status}
                      className="p-2 ring-1 ring-blue-100 rounded-md"
                    />
                    <button className="bg-blue-700 p-2 rounded-full">
                      <Image src="/edit.png" alt="" width={20} height={20} />
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
