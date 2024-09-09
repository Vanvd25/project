import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// định nghĩa hàm get để lấy đơn hàng 
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession(); //lấy sesion xác thực
  //nếu là admin thì lấy tất cả đơn hàng còn không phải thì tìm đơn hàng dựa vào email
  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });
      //kết quả trả về
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};

// định nghĩa hàm post tạo đơn hàng
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();// Lấy session xác thực

  if (session) {
    try {
      const body = await req.json();// Đọc và phân tích dữ liệu JSON từ request body
      const order = await prisma.order.create({
        data: body,// Tạo đơn hàng với dữ liệu từ body
      });
      //kết quả trả về
      return new NextResponse(JSON.stringify(order), { status: 201 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};
