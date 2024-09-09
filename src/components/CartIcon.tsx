"use client"
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const CartIcon = () => {
  const { data: session, status } = useSession(); // Sử dụng hook useSession để lấy thông tin phiên người dùng từ server-side
  const { totalItems } = useCartStore(); // Sử dụng hook useCartStore để lấy số lượng sản phẩm trong giỏ hàng từ store
  const router = useRouter(); // Sử dụng hook useRouter để truy cập đối tượng router trong Next.js


  // Gọi phương thức persist.rehydrate() từ useCartStore khi component được render lần đầu tiên
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <div className="flex items-center gap-4">
      <Link href="/cart">
        <div className="relative w-8 h-8 md:w-5 md:h-5">
          <Image
            src="/cart.png"
            alt="Cart Icon"
            fill
            sizes="100%"
            className="object-contain"
          />
        </div>
      </Link>
      {session?.user.isAdmin && (
        <button
          className="p-1 bg-red-500 text-white rounded-md"
          onClick={() => router.push('http://localhost:5555')}
        >
          Thêm sản phẩm
        </button>
      )}
      {!session?.user.isAdmin && (
        <span>Giỏ hàng ({totalItems})</span>
      )}
    </div>
  );
};

export default CartIcon;