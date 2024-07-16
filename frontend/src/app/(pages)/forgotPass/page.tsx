"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/buttons/button";
import "../login/login.css";
import { sendEmail } from "@/utils/SendEmailFunc/SendEmail";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    console.log("Forgot password request submitted with email:", email);
    if (email) sendEmail(email, "You forgot your Password");
  };

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

      <div className="login-form absolute top-40 left-3/4 z-40 w-2/4 h-1/5">
        <h1 className="mb-7 text-4xl text-white font-bold">
          Welcome to <span>Project Supervision</span>
        </h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-4/5  p-10 rounded-lg bg-white gap-6"
        >
          <h1 className="text-4xl font-bold self-center">Forgot Password?</h1>
          <h2 className="text-sm text-gray 500 text-center">
            {`Enter the email address registered with your account. We'll send you
            a link to reset your password.`}
          </h2>

          <label htmlFor="email" className="pl-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="username@gmail.com"
            className="p-6 rounded-md border border-red-900"
          />
          <Button title="Submit" onClick={handleLogin} />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
