"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../login/login.css";
import { useRouter } from "next/navigation";
import Button from "@/components/buttons/button";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setErrorMessage("");
  };

  const handleForgotPassword = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    router.push("/forgotpass");
  };

  const handleSignup = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    router.push("/signUp");
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
          <h1 className="text-4xl font-bold self-center">Log In</h1>
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

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <a
            href="#"
            className="text-red-900 underline hover:opacity-90"
            onClick={handleForgotPassword}
          >
            Forgotten Password?
          </a>
          <Button title="Login" onClick={handleLogin} />
          <h2 className="text-lg text-center">
            Don't have an account yet?{" "}
            <a
              href="#"
              onClick={handleSignup}
              className="text-red-900 underline hover:opacity-90"
            >
              SignUp
            </a>
          </h2>
        </form>
      </div>
    </div>
  );
};

export default Login;
