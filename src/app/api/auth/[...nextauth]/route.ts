import { authOptions } from "@/utils/auth";
import NextAuth from "next-auth/next";
// Khởi tạo handler NextAuth với các tùy chọn xác thực
const handler = NextAuth(authOptions);

// Xuất handler dưới dạng các phương thức GET và POST
export { handler as GET, handler as POST };