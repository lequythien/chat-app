import React from "react";
import { RxReset } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="bg-white p-6 shadow-lg max-w-md w-full text-center">
        {/* Thông báo */}
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Quên mật khẩu?
        </h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Chức năng này chưa được triển khai. Bạn có thể tạo tài khoản mới để
          tiếp tục! 😊
        </p>

        {/* Nút quay lại trang chủ */}
        <NavLink to="/email">
          <button className="flex items-center justify-center gap-2 mx-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
            <RxReset className="text-lg" />
            Quay lại trang chủ
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ForgotPassword;
