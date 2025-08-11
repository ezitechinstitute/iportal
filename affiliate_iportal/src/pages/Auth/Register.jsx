import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
  FaGithub,
} from "react-icons/fa";
import registerImage from "../../assets/login-v2.svg";
import logo from "../../assets/logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    affiliate_Username: "",
    affiliate_email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8088/api/affiliate/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || "Registration failed");
        // toast.error(data.message || "Login failed");

      } else {
        if (data.token) {
          toast.success("Registration successful!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            const navigate = useNavigate();
            navigate("/login");
          }, 2000);
        }
        // setSuccess("Registration successful!");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen items-left flex flex-col md:flex-row font-sans">
      <img src={logo} alt="Logo" className="absolute w-36 mt-8 hidden lg:block ml-7" />

      {/* Left Side Image */}
      <div className="hidden lg:flex w-full justify-center items-center bg-gray-100">
        <img
          src={registerImage}
          alt="Register Illustration"
          className="max-w-3xl w-full h-auto"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex  text-gray-500  items-center flex-col text-md justify-center w-full lg:w-1/2 px-6 pt-16 lg:p-10 xl:p-16 bg-white">
        <h2 className="text-2xl mb-2 ">Create your account</h2>
        <p className="text-gray-400 text-sm mb-6">Join Ezitech and start your journey today!</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleRegister} className="w-full max-w-sm space-y-4">
          <div>
            <label htmlFor="affiliate_Username" className="block text-sm font-medium text-gray-400">
              Name
            </label>
            <input
              type="text"
              id="affiliate_Username"
              name="affiliate_Username"
              required
              value={formData.affiliate_Username}
              onChange={handleInput}
              className="w-full px-4 py-2 border text-sm rounded-md text-gray-700 border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="affiliate_email" className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="affiliate_email"
              name="affiliate_email"
              required
              value={formData.affiliate_email}
              onChange={handleInput}
              className="w-full px-4 py-2 border text-sm rounded-md text-gray-700 border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
              placeholder="ezitech@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInput}
              className="w-full px-4 py-2 border text-sm rounded-md text-gray-700 border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded shadow-indigo-500 hover:shadow-lg transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm self-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>

        <div className="flex items-center w-full my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="flex gap-4 self-center">
          <a className="p-2 bg-blue-600 text-white rounded-full" href="#"><FaFacebookF /></a>
          <a className="p-2 bg-sky-400 text-white rounded-full" href="#"><FaTwitter /></a>
          <a className="p-2 bg-red-500 text-white rounded-full" href="#"><FaEnvelope /></a>
          <a className="p-2 bg-gray-800 text-white rounded-full" href="#"><FaGithub /></a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
