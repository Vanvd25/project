import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// HÀM LẤY TẤT CẢ SẢN PHẨM
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url); // Lấy searchParams từ URL của request
  const cat = searchParams.get("cat"); // Lấy giá trị của tham số "cat" từ searchParams

  try {
    // Sử dụng Prisma Client để tìm các sản phẩm dựa vào điều kiện
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }), // Nếu có tham số "cat", lọc theo catSlug, nếu không thì lọc theo isFeatured
      },
    });
    // Trả về phản hồi thành công với danh sách sản phẩm

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
//hàm post tạo sản phẩm mới
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();// Đọc và phân tích dữ liệu JSON từ request body
    const product = await prisma.product.create({
      data: body,// Tạo sản phẩm mới với dữ liệu từ body
    });
    //kết quả trả về
    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
