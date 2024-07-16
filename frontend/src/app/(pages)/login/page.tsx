"use client";
import React, { useState } from "react";
import Image from "next/image";
import "../login/login.css";
import { useRouter } from "next/navigation";
import { LOGIN_URL } from "@/constants/config";
import { IResponse } from "@/interfaces/IResponse";
import Button from "@/components/buttons/button";
import { toast } from "react-toastify";

const validatePassword = (password) => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasLetter = /[a-zA-Z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (!password.trim()) {
    return "Please enter your password.";
  }

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }

  if (!hasNumber.test(password)) {
    return "Password must contain at least one number.";
  }

  if (!hasLetter.test(password)) {
    return "Password must contain at least one letter.";
  }

  if (!hasSpecialChar.test(password)) {
    return "Password must contain at least one special character.";
  }

  return null;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    if (!email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }
    const data = {
      username: email,
      password: password,
    };

    const getLogin = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await getLogin.json();
    console.log(getLogin.status);
    if (getLogin.status != 200) {
      const { code, message, data } = result;
      setErrorMessage(message);
    } else {
      const response: IResponse = result;
      toast.success("Successfully Login");
      localStorage.setItem("token", JSON.stringify(response.data));
      router.push("/otpCode");
    }
    setErrorMessage("");
    // Proceed with login logic
  };

  const handleForgotPassword = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push("/forgotPass");
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
        <h1 className="mb-7 text-3xl text-white font-bold">
          Welcome to <span>Project Supervision</span>
        </h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
          className="flex flex-col w-4/5 p-10 rounded-lg bg-white gap-6"
        >
          <h1 className="text-3xl font-bold self-center -mt-3">Log In</h1>
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
          <label htmlFor="password" className="pl-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="p-6 rounded-md border border-gray-300 -mt-4"
          />

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <a
            href="#"
            className="text-red-900 underline hover:opacity-90"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </a>
          <Button title="Login" onClick={handleLogin} />
          <h2 className="text-lg text-center">
            {`Don't have an account yet?`}{" "}
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
