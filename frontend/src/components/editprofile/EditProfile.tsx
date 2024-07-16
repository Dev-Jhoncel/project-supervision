"use client";
import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface EditProfileProps {
  toggleDrawer: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ toggleDrawer }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleUpdate = () => {
    // Handle the update logic here
    console.log("Profile updated:", { username, email, phoneNumber });
  };

  return (
    <>
      <div className="-ml-46">
        <div
          onClick={toggleDrawer}
          className="self-start hover:text-red-900 cursor-pointer"
        >
          <MdKeyboardArrowLeft size={20} />
        </div>
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-bold ml-36">Edit Profile</h2>
        </div>
        <div className="flex flex-col items-center mb-4">
          <img
            src="userprofile1.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2"
          />
          <button className="text-sm text-red-900 hover:text-red-500">
            Change Picture
          </button>
        </div>
        <div className="mb-4 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button
          onClick={handleUpdate}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          Update
        </button>
      </div>
    </>
  );
};

export default EditProfile;
