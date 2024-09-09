import { AddressElement } from "@stripe/react-stripe-js"; // Import AddressElement từ thư viện Stripe React
import React from "react"; // Import thư viện React

const AddressForm = () => {
  return (
    <form>
      <h3>Address</h3>
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(event) => { // Xử lý sự kiện khi địa chỉ thay đổi
          // Kiểm tra nếu địa chỉ đã hoàn thành nhập liệu
          if (event.complete) { 
            // Lấy địa chỉ từ sự kiện
            const address = event.value.address;
          }
        }}
      />
    </form>
  );
};

export default AddressForm;
