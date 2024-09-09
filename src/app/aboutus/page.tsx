


"use client"; // Sử dụng directive "use client" của Next.js

import { useSession } from "next-auth/react"; 
import { useRouter } from "next/navigation"; 
import React from "react"; 
import Link from "next/link"; 

const AboutPage = () => {
  const { data: session, status } = useSession(); // Sử dụng hook useSession để lấy thông tin phiên đăng nhập và trạng thái
  const router = useRouter(); // Sử dụng hook useRouter để điều hướng trang
  //kiểm tra trạng thái phiên đăng nhập
  if (status === "unauthenticated") {
    
    router.push("/");
  }

  if (status === "loading") return "Loading..."; // Nếu trạng thái là "loading", hiển thị thông báo "Loading..."
  //nội dung của trang
  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <h1 className="text-3xl font-bold mb-6 text-center">Giới thiệu</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-4">
          Đây là đồ án chuyên ngành A của nhóm chúng em! Gồm có 3 thành viên:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Võ Đăng Văn - 22013065</li>
          <li>Nguyễn Minh Tấn - 22013080</li>
          <li>Trần Đức Tài - 22013082</li>
        </ul>
        <p className="text-lg mb-4">
          Chúng em làm đồ án này trong khoảng 3 tháng, tuy còn sơ sài nhưng mong quý thầy cô thông cảm!
        </p>
        <p className="text-lg">
          Thông tin liên hệ{" "}
          <Link href="https://www.facebook.com/profile.php?id=100023609030331" className="text-blue-500 hover:underline">
            Facebook
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default AboutPage; 
