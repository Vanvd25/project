"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
  const { status } = useSession(); // Sử dụng hook useSession để lấy trạng thái đăng nhập của người dùng
  return (
    <div>
      {status === "authenticated" ? (// Kiểm tra nếu người dùng đã đăng nhập
        <div>
          <Link href="/orders">Đặt Hàng</Link>
          <span className="ml-4 cursor-pointer" onClick={() => signOut()}>Logout</span>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default UserLinks;
