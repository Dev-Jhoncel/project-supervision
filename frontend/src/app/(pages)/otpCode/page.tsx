"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/buttons/button";
import { useRouter } from "next/navigation";
import "../login/login.css";
import sanitizeInput from "@/utils/CheckingFunc/CheckIFNumber";
import { SendOtp } from "@/utils/OtpFunc/SendOTP";
import { ValidateOTP } from "@/utils/OtpFunc/ValidateOTP";
import toast from "react-hot-toast";
import jwt from "jsonwebtoken";
import { getUserDetails } from "@/utils/UserDetailsFunc/UserDetails";

const handleLogin = async () => {
  //decrypt jwt token
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const parseToken = token ? JSON.parse(token) : null;
    if (parseToken === null) {
      toast.error("Token was Empty!");
      throw new Error("Token was Empty!");
    } else {
      //get mobile number then send the otp
      const decodeToken = getUserDetails().mobileno;
      if (decodeToken) {
        const mobile: string = decodeToken.toString();
        if (decodeToken !== null) {
          console.log(mobile);
          const { code, message, error } = await SendOtp(mobile);
          console.log(code);
          console.log(message);
          console.log(error);
          if (error) {
            toast.error("Unable to Send OTP!");
            throw new Error("UNABLE_TO_SEND_OTP");
          }
          return 0;
        }
        return mobile;
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

const OtpPassword: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [boxOne, setBoxOneValue] = React.useState("");
  const [boxTwo, setBoxTwoValue] = React.useState("");
  const [boxThree, setBoxThreeValue] = React.useState("");
  const [boxFour, setBoxFourValue] = React.useState("");
  const [boxFive, setBoxFiveValue] = React.useState("");
  const [boxSix, setBoxSixValue] = React.useState("");
  const [userMobile, setuserMobile] = useState<string>("");
  const [buttonText, setButtonText] = useState("Submit");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleRedirect = () => {
    router.push("/");
  };

  useEffect(() => {
    if (!isLoading) {
      setButtonText("Sending Otp");
      setIsButtonDisabled(true);
      try {
        const result = handleLogin();
        setuserMobile(getUserDetails().mobileno.toString());
        setButtonText("Submit");
        setIsButtonDisabled(false);
      } catch (error) {
        console.log(error);
        if (error.message === "UNABLE_TO_SEND_OTP") {
          toast.error("Unable to Send Otp");
        } else {
          handleRedirect();
          throw new Error(error);
        }
      } finally {
        setIsLoading(false);
        setButtonText("Submit");
        setIsButtonDisabled(false);
      }
    }
  }, [isLoading]);

  const handleOnChangeOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setBoxOneValue(sanitizeInput(event.target.value));
      const nextInput = document.getElementById("input2");
      if (event.target.value !== "") nextInput?.focus();
    }
  };

  const handleOnChangeTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      console.log(`Box2 ${event.target.value}`);
      setBoxTwoValue(sanitizeInput(event.target.value));
      const nextInput = document.getElementById("input3");
      if (event.target.value !== "") nextInput?.focus();
    }
  };

  const handleOnChangeThree = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      console.log(`Box3 ${event.target.value}`);
      setBoxThreeValue(sanitizeInput(event.target.value));
      const nextInput = document.getElementById("input4");
      if (event.target.value !== "") nextInput?.focus();
    }
  };

  const handleOnChangeFour = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      console.log(`Box4 ${event.target.value}`);
      setBoxFourValue(sanitizeInput(event.target.value));
      const nextInput = document.getElementById("input5");
      if (event.target.value !== "") nextInput?.focus();
    }
  };

  const handleOnChangeFive = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      console.log(`Box5 ${event.target.value}`);
      setBoxFiveValue(sanitizeInput(event.target.value));
      const nextInput = document.getElementById("input6");
      if (event.target.value !== "") nextInput?.focus();
    }
  };

  const handleOnChangeSix = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      console.log(`Box6 ${event.target.value}`);
      setBoxSixValue(sanitizeInput(event.target.value));
    }
  };

  const handleSubmit = async () => {
    setButtonText("Validating Otp");
    setIsButtonDisabled(true);
    const otpCode = `${boxOne}${boxTwo}${boxThree}${boxFour}${boxFive}${boxSix}`;
    console.log(`User Mobile: ${userMobile}`);
    const { code, message, error } = await ValidateOTP(userMobile, otpCode);
    console.log(error);
    console.log(message);
    console.log(code);
    if (error) toast.error(message);
    if (+code === 1) {
      router.push("/dashboard");
    }
    setButtonText("Submit");
    setIsButtonDisabled(false);
    console.log(code);
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

      <div className="login-form absolute top-40 left-3/4 w-max h-1/5">
        <h1 className="mb-7 text-3xl text-white font-bold">
          Welcome to <span>Project Supervision</span>
        </h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full p-10 rounded-lg bg-white gap-6"
        >
          <h1 className="text-3xl font-bold self-center p-2">
            Confirmation Code
          </h1>
          <h2 className="text-sm text-gray 500 text-center">
            We’ve sent an sms to mobile number, please enter the 6-digit code
            below.
          </h2>
          <div className="flex flex-col items-center space-y-2 ">
            <div className="flex justify-center space-x-2">
              <input
                type="text"
                maxLength={1}
                id="input1"
                value={boxOne}
                onChange={handleOnChangeOne}
                className="w-14 h-20 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <input
                type="text"
                maxLength={1}
                id="input2"
                value={boxTwo}
                onChange={handleOnChangeTwo}
                className="w-14 h-20 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <input
                type="text"
                id="input3"
                maxLength={1}
                value={boxThree}
                onChange={handleOnChangeThree}
                className="w-14 h-20 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <input
                maxLength={1}
                type="text"
                id="input4"
                value={boxFour}
                onChange={handleOnChangeFour}
                className="w-14 h-20 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <input
                maxLength={1}
                type="text"
                id="input5"
                value={boxFive}
                onChange={handleOnChangeFive}
                className="w-14 h-20
                 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <input
                maxLength={1}
                type="text"
                id="input6"
                value={boxSix}
                onChange={handleOnChangeSix}
                className="w-14 h-20
                 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
              />
            </div>
          </div>
          <Button
            title={`${buttonText}`}
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          />
          <div className="text-center">
            <h2 className="text-l text-gray-500">
              Haven’t received a code?{" "}
              <span
                className="text-red-900 underline hover:opacity-90"
                onClick={handleLogin}
              >
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
