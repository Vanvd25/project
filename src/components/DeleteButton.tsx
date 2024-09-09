"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>; // Nếu đang trong quá trình tải phiên đăng nhập, hiển thị "Loading..."
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return; // Nếu chưa xác thực đăng nhập hoặc người dùng không phải là admin, không hiển thị nút xóa
  }

  // Gửi yêu cầu DELETE tới API để xóa sản phẩm với id nhận được
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      router.push("/menu"); // Nếu xóa thành công, điều hướng đến trang "/menu"
      toast("The product has been deleted!"); // Hiển thị thông báo thành công bằng toast
    } else {
      const data = await res.json();
      toast.error(data.message); // Nếu có lỗi, hiển thị thông báo lỗi từ dữ liệu trả về
    }
  };

  // Trả về giao diện nút xóa sản phẩm
  return (
    <button
      className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6"
      onClick={handleDelete}
    >
      <Image src="/delete.png" alt="" width={20} height={20} />
    </button>
  );
};

export default DeleteButton;