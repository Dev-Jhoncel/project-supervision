"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../login/login.css";
import { useRouter } from "next/navigation";
import Button from "@/components/buttons/button";

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setErrorMessage("Please enter your password.");
      return;
    }

    if (!confirmPassword.trim()) {
      setErrorMessage("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    // Handle successful password setting here
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
          className="flex flex-col w-4/5 p-10 rounded-lg bg-white gap-6"
        >
          <h1 className="text-3xl font-bold text-center">Set New Password</h1>
          <p className="text-gray-900 text-sm text-center">
            Ensure your password is strong and secure.
          </p>
          <label htmlFor="password" className="pl-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="p-6 rounded-md border border-red-900"
          />
          <label htmlFor="confirmPassword" className="pl-2 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="p-6 rounded-md border border-red-900"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <Button title="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
