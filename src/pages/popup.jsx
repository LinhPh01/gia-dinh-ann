import React from "react";

const Popup = ({ onAgree, onDisagree }) => {
  return (
    <div className="fixed px-4 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg ">
        <h2 className="text-xl font-bold mb-4 ">Yêu cầu số điện thoại</h2>
        <p className="mb-4">
          Số điện thoại được dùng để tích lũy điểm , đổi quà
        </p>
        <div className="flex justify-end">
          <button
            onClick={onAgree}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Đồng ý
          </button>
          <button
            onClick={onDisagree}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Không đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
