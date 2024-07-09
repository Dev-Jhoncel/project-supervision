"use client";

import React, { useState } from "react";
import Image from "next/image";
import "../login/login.css";
import { useRouter } from "next/navigation";
import Button from "@/components/buttons/button";
import { SIGN_UP_URL } from "@/constants/config";
import { IResponse } from "@/interfaces/IResponse";
import toast from "react-hot-toast";

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!firstName.trim()) {
      setErrorMessage("Please enter your first name.");
      return;
    }
    if (!lastName.trim()) {
      setErrorMessage("Please enter your last name.");
      return;
    }
    if (!middleName.trim()) {
      setErrorMessage("Please enter your middle name.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }
    if (!mobileNumber.trim()) {
      setErrorMessage("Please enter your mobile number.");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("Please enter your password.");
      return;
    }

    const data = {
      first_name: firstName.toUpperCase().trim(),
      last_name: lastName.toUpperCase().trim(),
      middle_name: middleName.toUpperCase().trim(),
      suffix: suffix.toUpperCase().trim(),
      email_address: email.trim(),
      mobile_no: mobileNumber.trim(),
      password: password.trim(),
    };

    //Integrating to endpoint register
    const registerUser = await fetch(SIGN_UP_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await registerUser.json();
    console.log(result);
    console.log(registerUser.status);

    if (registerUser.status != 201) {
      const { code, message, data } = result;
      let error_message =
        registerUser.status === 500 ? "Unable to add user" : message;
      toast.error(error_message);
    } else {
      const response: IResponse = result;
      console.log(response);
      toast.success(response.message);
    }
    setErrorMessage("");
  };

  const handleLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push("/login");
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
        <h1 className="text-4xl text-white font-bold mb-4">
          Welcome to <span>Project Supervision</span>
        </h1>
        <form
          onSubmit={handleSignup}
          className="flex flex-col w-4/5 p-10 rounded-lg bg-white gap-2"
        >
          <h1 className="text-4xl font-bold self-center">SignUp</h1>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="pl-2 font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="p-4 rounded-md border border-red-900 w-full"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="pl-2 font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="p-4 rounded-md border border-red-900 w-full"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="middleName" className="pl-2 font-medium">
                Middle Name
              </label>
              <input
                type="text"
                id="middleName"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Middle Name"
                className="p-4 rounded-md border border-red-900 w-full"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="suffix" className="pl-2 font-medium">
                Suffix
              </label>
              <input
                type="text"
                id="suffix"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                placeholder="Suffix (optional)"
                className="p-4 rounded-md border border-red-900 w-full"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="email" className="pl-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@gmail.com"
              className="pl-4 p-4 rounded-md border border-red-900 w-full"
            />
          </div>
          <div className="relative">
            <label htmlFor="email" className="pl-2 font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="mobilenumber"
              className="p-4 rounded-md border border-red-900 w-full"
            />
          </div>
          <label htmlFor="password" className="pl-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="p-4 rounded-md border border-red-900 "
          />

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div className="pt-4">
            <Button title="SignUp" onClick={handleSignup} />
            <h2 className="text-l text-center pt-3 ">
              Have an account?{" "}
              <a
                href="#"
                onClick={handleLogin}
                className="text-red-900 underline hover:opacity-90"
              >
                Login
              </a>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
