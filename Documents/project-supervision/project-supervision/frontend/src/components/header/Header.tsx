"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import SearchBar from "../searchbar/SearchBar";
import UserProfile from "@/app/(pages)/userprofile/page.";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileDrawer = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfileDrawer = () => {
    setIsProfileOpen(false);
  };

  return (
    <div>
      <div className="w-full shadow text-white flex justify-between items-center p-4">
        <h1 className="text-xl font-bold"></h1>
        <div className="flex items-center gap-6">
          <SearchBar
            onSearch={(query: string) => {
              // Implement your search functionality here
            }}
          />
          <div
            className="text-black rounded-full px-4 py-1 ml-2 cursor-pointer border border-black relative"
            onClick={toggleProfileDrawer}
          >
            <div className="logo flex flex-row items-center">
              <Image
                src={`/profile.jpg`}
                alt="profile"
                width={30}
                height={30}
                className="rounded-full mx-1"
              />
              <RiArrowDropDownLine width={50} />
            </div>

            {/* Close button inside profile drawer */}
            {isProfileOpen && (
              <button
                onClick={closeProfileDrawer}
                className="absolute top-0 right-0 m-2 text-gray-600 focus:outline-none"
              >
                X
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Drawer */}
      {isProfileOpen && (
        <div
          className="fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg z-50"
          onClick={closeProfileDrawer}
        >
          {/* Content of the profile drawer */}
          <UserProfile />
        </div>
      )}
    </div>
  );
};

export default Header;
