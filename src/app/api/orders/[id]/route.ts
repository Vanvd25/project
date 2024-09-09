import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


// Định nghĩa hàm PUT để thay đổi trạng thái của đơn hàng
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    //đọc và phân tích dữ liệu json từ request body để lấy trạng thái mới của đơn hàng
    const body = await req.json();
    //cập nhập trạng thái của đơn hàng(id)
    await prisma.order.update({
      where: {
        id: id,
      },
      data: { status: body },
    });
    //kết quả trả về
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
