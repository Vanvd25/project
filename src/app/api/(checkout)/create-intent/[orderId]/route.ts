import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//định nghĩa hàm post (nhận vào request và chứa thong tin request và params chứa orderId)
export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
// tìm đơn hàng trong cơ sở dữ liệu (dựa vào orderID)
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
// tạo payment intent với Stripe nếu đơn hàng tồn tại
  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
//cập nhập intent_id của đơn hàng
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { intent_id: paymentIntent.id },
    });
//kết quả trả về
    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  }
  return new NextResponse(
    JSON.stringify({ message:"Order not found!" }),
    { status: 404 }
  );
}