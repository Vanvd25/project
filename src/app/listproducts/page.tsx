"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type Product = {// Định nghĩa kiểu dữ liệu Product
  id: string;
  title: string;
  desc: string;
  img?: string;
  price: number;
  isFeatured: boolean;
  options: any[];
  category: {
    slug: string;
  };
  catSlug: string;
};

const getData = async () => {// Hàm async để lấy dữ liệu từ API
    try {
      const res = await fetch('/api/listproducts', {// Gửi yêu cầu GET đến API /api/listproducts
        cache: 'no-store',// Không lưu cache để luôn lấy dữ liệu mới nhất
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
  
      return res.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Ném lại lỗi để xử lý nó trong useEffect
    }
  };
  
  const ListProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);// Khởi tạo state products để lưu danh sách sản phẩm
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchProducts() { // Hàm async để fetch danh sách sản phẩm từ API
        try {
          const data = await getData(); // Gọi hàm getData để lấy dữ liệu từ API
          setProducts(data); // Cập nhật state products với dữ liệu lấy được từ API
        } catch (error) {
          setError('Không thể lấy danh sách sản phẩm. Vui lòng thử lại sau.');
          console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        }
      }
  
      fetchProducts();// Gọi hàm fetchProducts khi component được render lần đầu tiên
    }, []);
  
    if (error) {
      return (
        <div className="p-4 lg:px-20 xl:px-40">
          <h1 className="text-3xl font-bold text-center my-8">Lỗi</h1>
          <p className="text-red-600 text-center">{error}</p>
        </div>
      );
    }
  
    return (
      <div className="p-4 lg:px-20 xl:px-40">
        <h1 className="text-3xl font-bold text-center my-8">Danh Sách Sản Phẩm</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-lg">
              {product.img && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.img}
                    alt={product.title}
                    className="object-cover"
                    fill
                  />
                </div>
              )}
              <h2 className="text-xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-700 mb-4">{product.desc}</p>
              <p className="text-lg font-bold text-orange-600 mb-4">${product.price}</p>
              <Link href={`/products/${product.id}`}>
                <button className="bg-orange-600 text-white py-2 px-4 rounded-md">
                  Xem chi tiết
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };  

export default ListProductsPage;
