import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";
//định nghĩa hàm Put( nhận vào thâm số 'params' chứa IntendID để xác định đơn hàng cần cập nhập)
export const PUT = async ({ params }: { params: { intentId: string } }) => {
  const { intentId } = params;
//cập nhật trạng tahis đơn hàng bằng Prisma Client dựa vào intent_id
  try {
    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: "Being prepared!" },
    });
    //kết quả trả về thành công hoặc thất bại
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
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
