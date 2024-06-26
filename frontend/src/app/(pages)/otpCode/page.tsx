"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/button";
import "../login/login.css";

const OtpPassword = () => {
  const handleLogin = () => {};

  return (
    <div className="container relative">
      <div>
        <div className="overlay absolute bg-red-900 w-4/6 h-screen top-0 z-20 rounded-r-full"></div>
        <div className="logo z-27 p-1">
          <Image
            src={`/mlLogo.png`}
            alt="logo"
            width={600}
            height={600}
            className="relative z-30 top-56 left-32"
          />
        </div>
      </div>

      <div className="login-form absolute top-40 left-3/4 w-max h-1/5">
        <h1 className="mb-7 text-4xl text-white font-bold">
          Welcome to <span>Project Supervision</span>
        </h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full p-10 rounded-lg bg-white gap-6"
        >
          <h1 className="text-4xl font-bold self-center p-2">
            Forgot Password?
          </h1>
          <h2 className="text-sm text-gray 500 text-center">
            We’ve sent an email to username@gmail.com, please enter the 5-digit
            code below.
          </h2>
          <div className="flex flex-col items-center space-y-2 ">
            <div className="flex justify-center space-x-2">
              <input
                maxlength="1"
                className="w-14 h-20 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <input
                maxlength="1"
                className="w-14 h-20 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <input
                maxlength="1"
                className="w-14 h-20 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <input
                maxlength="1"
                className="w-14 h-20 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <input
                maxlength="1"
                className="w-14 h-20
                 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
              />
            </div>
          </div>
          <Button title="Submit" />
          <div className="text-center">
            <h2 className="text-l text-gray-500">
              Haven’t received a code?{" "}
              <span className="text-red-900 underline hover:opacity-90">
                Resend
              </span>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpPassword;
