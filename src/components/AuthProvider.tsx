"use client"; // Đặt directive để xác định mã này sẽ chạy trên client-side
import { SessionProvider } from "next-auth/react" // Import SessionProvider từ thư viện next-auth để quản lý phiên đăng nhập

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;