"use client";

import React, { useState } from "react";
import Image from "next/image";
import "../login/login.css";
import { useRouter } from "next/navigation";
import Button from "@/components/button";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setErrorMessage("");
    // Add your signup logic here
  };

  const handleLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push("/login");
  };

  return (
    <div className="container relative">
      <div>
        <div className="overlay absolute bg-red-900 w-4/6 h-screen top-0 z-20 rounded-r-full"></div>
        <div className="logo z-30 p-2">
          <Image
            src={`/mlLogo.png`}
            alt="logo"
            width={600}
            height={600}
            className="relative z-30 top-56 left-32"
          />
        </div>
      </div>

      <div className="login-form absolute top-56 left-3/4 z-40 w-2/4 h-1/5">
        <h1 className="mb-10 text-4xl text-white font-bold">
          Welcome to <span>Project Supervision</span>
        </h1>
        <form
          onSubmit={handleSignup}
          className="flex flex-col w-full p-10 rounded-lg bg-white gap-6"
        >
          <h1 className="text-4xl font-bold self-center">SignUp</h1>
          <label htmlFor="name" className="pl-2 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            className="p-6 rounded-md border border-gray-300"
          />
          <label htmlFor="email" className="pl-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="username@gmail.com"
            className="p-6 rounded-md border border-gray-300"
          />
          <label htmlFor="password" className="pl-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="p-6 rounded-md border border-gray-300"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <Button title="SignUp" onClick={handleSignup} />
          <h2 className="text-lg text-center">
            Have an account?{" "}
            <a
              href="#"
              onClick={handleLogin}
              className="text-red-900 underline hover:opacity-90"
            >
              Login
            </a>
          </h2>
        </form>
      </div>
    </div>
  );
};

export default Signup;