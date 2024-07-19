"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/buttons/button";
import "../login/login.css";
import { sendEmail } from "@/utils/SendEmailFunc/SendEmail";
import { BASE_URL } from "@/constants/config";
import { resetCredentials } from "@/utils/UserDetailsFunc/SendRestCode";
import toast from "react-hot-toast";
import { generateRandomString } from "@/utils/CheckingFunc/StringRandomizer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleLogin = async () => {
    setButtonText("Submitting");
    setIsButtonDisabled(true);
    console.log("Forgot password request submitted with email:", email);
    const randomString = generateRandomString(10);
    if (email && randomString) {
      const result = await resetCredentials(email, randomString);
      console.log(result);
      if (result.code === "SUCCESS") {
        sendEmail(
          email,
          `Refer to this link to reset your password: ${BASE_URL}/changepassword?code=${randomString}`
        );
        toast.success("Email Sent!");
        setButtonText("Submit");
        setIsButtonDisabled(false);
      } else {
        toast.error("Unable to send Email.");
        setButtonText("Submit");
        setIsButtonDisabled(false);
      }
    }
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
        <h1 className="mb-7 text-3xl text-white font-bold">
          Welcome to <span>Project Supervision</span>
        </h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-4/5  p-10 rounded-lg bg-white gap-6"
        >
          <h1 className="text-2xl font-bold self-center">Forgot Password?</h1>
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
            className="p-6 rounded-md border border-gray-300 -mt-4"
          />
          <Button
            title={`${buttonText}`}
            onClick={handleLogin}
            disabled={isButtonDisabled}
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
