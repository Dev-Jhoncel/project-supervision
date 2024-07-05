"use client";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import Modal from "@/components/generalModal/Modal";
import Button from "@/components/buttons/button";

const UserProfile: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="flex flex-col items-center h-screen text-black p-10">
      <div className="relative mb-4">
        <img
          src="userprofile1.jpg"
          alt="User Profile"
          className="h-32 w-32 object-cover rounded-full border-4"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-full">
          <FaCamera className="text-2xl text-gray-300 mt-14" />
        </div>
      </div>
      <div className="text-center">
        <h1 className="font-bold text-2xl">Jhoncel Cadiena</h1>
        <h2 className="text-sm">Project Manager</h2>
      </div>
      <div className="mt-14 w-full flex justify-around -ml-8 gap-1">
        <div className="flex items-center gap-1">
          <MdEmail className="text-sm" />
          <h1 className="text-sm hover:italic cursor-pointer">
            jhoncel@example.com
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <FaPhoneAlt className="text-sm" />
          <h1 className="text-sm hover:italic cursor-pointer">09123456789</h1>
        </div>
      </div>
      <div className="mt-14 ml-9 w-full">
        <hr />
        <div className="flex items-center hover:text-green-900 text-semibold cursor-pointer">
          <AiFillEdit className="text-xl mr-2 mt-10" />
          <h1 className="text-sm mt-10">Edit Profile</h1>
        </div>
        <div
          className="flex items-center hover:text-red-900 text-semibold"
          onClick={openModal}
        >
          <MdOutlineLogout className="text-xl mr-2 mt-10" />
          <h1 className="text-sm mt-10 cursor-pointer">Log out</h1>
        </div>
      </div>

      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <div className="text-center">
          <h1 className="text-xl mb-4">Are you sure you want to logout?</h1>
          <div className="flex items-center justify-center gap-4 cursor-pointer">
            <p onClick={closeModal}>Cancel</p>
            <span
              onClick={() => console.log("Logged out")}
              className="bg-red-800 text-white text-sm px-4 py-2 rounded-2xl hover:bg-red-900 cursor-pointer"
            >
              Logout
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
