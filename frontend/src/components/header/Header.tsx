"use client";
import React from "react";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import SearchBar from "../searchbar/SearchBar";

const Header = () => {
  return (
    <div>
      <div className="w-full shadow text-white flex justify-between items-center p-4">
        <h1 className="text-xl font-bold"></h1>
        <div className="flex items-center gap-6">
          <SearchBar
            onSearch={function (query: string): void {
              throw new Error("Function not implemented.");
            }}
          />
          <div className="text-black rounded-full px-4 py-1  ml-2 cursor-pointer border border-black">
            <div className="logo flex flex-row items-center">
              <Image
                src={`/profile.jpg`}
                alt="profile"
                width={30}
                height={30}
                className="rounded-full mx-1 "
              />
              <RiArrowDropDownLine width={50} />
            </div>
          </div>
        </div>
      </div>
      {/* Add the rest of your content here */}
    </div>
  );
};

export default Header;
