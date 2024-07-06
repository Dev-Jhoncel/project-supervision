"use client";
import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleUpdate = () => {
    // Handle the update logic here
    console.log("Profile updated:", { username, email, phoneNumber });
  };

  return (
    <div className="flex flex-col items-center h-screen bg-white-800 box shadow-lg text-black p-10 w-96">
      <div className="-ml-20">
        <MdKeyboardArrowLeft />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Profile</h2>
      </div>
      <div className="flex flex-col items-center mb-4">
        <img
          src="userprofile1.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full mb-2"
        />
        <button className="text-sm text-red-500 hover:text-red-700">
          Change Picture
        </button>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phoneNumber"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdate}
        className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update
      </button>
    </div>
  );
};

export default EditProfile;
