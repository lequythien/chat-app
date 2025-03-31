import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";
import Divider from "./Divider";
import axios from "axios";
import taost from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { IoMdClose } from "react-icons/io";

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name,
    profile_pic: user?.profile_pic,
  });
  const [isImageOpen, setIsImageOpen] = useState(false); // State for image preview
  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setData((preve) => {
      return {
        ...preve,
        name: user.name,
        profile_pic: user?.profile_pic,
      };
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;
      const response = await axios({
        method: "post",
        url: URL,
        data: data,
        withCredentials: true,
      });

      taost.success(response?.data?.message);

      if (response.data.success) {
        dispatch(setUser(response.data.data));
        onClose();
      }
    } catch (error) {
      console.log(error);
      taost.error();
    }
  };

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const handleCloseImage = () => {
    setIsImageOpen(false);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm relative">
        <h2 className="font-semibold">Chi tiết hồ sơ</h2>
        <p className="text-sm">Chỉnh sửa thông tin người dùng</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Họ và tên:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full py-1 px-2 focus:outline-primary border"
            />
          </div>

          <div>
            <div>Ảnh:</div>
            <div className="my-1 flex items-center gap-4">
              <div className="cursor-pointer" onClick={handleImageClick}>
                <Avatar
                  width={80}
                  height={80}
                  imageUrl={data?.profile_pic}
                  name={data?.name}
                />
              </div>
              <label htmlFor="profile_pic">
                <button
                  className="font-semibold"
                  onClick={handleOpenUploadPhoto}
                >
                  Thay đổi ảnh
                </button>
                <input
                  type="file"
                  id="profile_pic"
                  className="hidden"
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>

          <Divider />
          <div className="flex gap-2 w-fit ml-auto">
            <button
              onClick={onClose}
              className="border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white"
            >
              Đóng
            </button>
            <button
              onClick={handleSubmit}
              className="border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>

      {/* Image Preview Modal */}
      {isImageOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex justify-center items-center z-20">
          <div className="relative">
            <button
              onClick={handleCloseImage}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700"
            >
              <IoMdClose />
            </button>
            <img
              src={data?.profile_pic}
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(EditUserDetails);
