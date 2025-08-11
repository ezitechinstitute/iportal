import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    FaFacebookF,
    FaTwitter,
    FaEnvelope,
    FaGithub,
    FaTimes,
} from "react-icons/fa";
import loginImage from "../../assets/login-v2.svg";
import logo from "../../assets/logo.png";

const Login = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({ loginEmail: "", loginPassword: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Forgot password modal
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleInput = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:8088/api/affiliate/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(value),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Login failed");
                return;
            }

            if (data.token) {
                toast.success("Login successful!");
                localStorage.setItem("affiliateToken", data.token);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 500);
            } else {
                setError("Invalid response from server.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Try again.");
        }
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        try {
            const res = await fetch("http://localhost:8088/api/affiliate/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) {
                setMessage({ type: "error", text: data.message || "Something went wrong." });
            } else {
                setMessage({ type: "success", text: data.message || "Check your email to reset your password." });
                setEmail("");
            }
        } catch (err) {
            setMessage({ type: "error", text: "Something went wrong. Please try again." });
        }
    };

    const closeForgotPasswordModal = () => {
        setIsModalClosing(true);
        setTimeout(() => {
            setShowForgotPasswordModal(false);
            setIsModalClosing(false);
            setEmail("");
            setMessage({ type: "", text: "" });
        }, 300);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) closeForgotPasswordModal();
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && showForgotPasswordModal) {
                closeForgotPasswordModal();
            }
        };

        if (showForgotPasswordModal) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [showForgotPasswordModal]);

    return (
        <>
            <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }

        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(-30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes modalFadeOut {
          from { opacity: 1; } to { opacity: 0; }
        }

        @keyframes modalSlideOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(-30px) scale(0.95); }
        }

        .modal-overlay-enter { animation: modalFadeIn 0.3s ease-out forwards; }
        .modal-overlay-exit { animation: modalFadeOut 0.3s ease-in forwards; }

        .modal-content-enter { animation: modalSlideIn 0.3s ease-out forwards; }
        .modal-content-exit { animation: modalSlideOut 0.3s ease-in forwards; }
      `}</style>

            <div className="min-h-screen flex flex-col pt-12 lg:pt-0 lg:flex-row font-sans">
                <img src={logo} alt="Logo" className="absolute w-36  hidden lg:block" />
                <div className="lg:w-full hidden lg:flex items-center justify-center bg-gray-100 p-10">
                    <img src={loginImage} alt="Login Visual" className="max-w-3xl w-full h-auto" />
                </div>

                <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center items-center bg-white text-gray-600">
                    <div className="w-full max-w-sm justify-center items-center font-sans">
                        <h2 className="text-2xl self-center  mb-2 text-gray-500 text-center">Welcome to Ezitech!</h2>
                        <p className="text-sm text-gray-400 mb-6 text-center">Please sign in to your account</p>

                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    name="loginEmail"
                                    required
                                    value={value.loginEmail}
                                    onChange={handleInput}
                                    className="w-full px-4 py-2 border text-sm rounded-md text-gray-700 border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
                                    placeholder="ezitech@example.com"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm text-gray-400">Password</label>
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotPasswordModal(true)}
                                        className="text-xs text-indigo-600 hover:underline"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    name="loginPassword"
                                    required
                                    value={value.loginPassword}
                                    onChange={handleInput}
              className="w-full px-4 py-2 border text-sm rounded-md text-gray-700 border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input id="remember" type="checkbox" className="h-4 w-4" />
                                <label htmlFor="remember" className="text-sm">Remember me</label>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md shadow transition duration-200"
                            >
                                Login
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            New here?{" "}
                            <a href="/register" className="text-indigo-500 hover:underline">
                                Register
                            </a>
                        </p>

                        <div className="my-6 flex items-center justify-center space-x-4">
                            <a href="#" className="p-2 bg-blue-600 text-white rounded-full hover:scale-110 transition"><FaFacebookF /></a>
                            <a href="#" className="p-2 bg-sky-400 text-white rounded-full hover:scale-110 transition"><FaTwitter /></a>
                            <a href="#" className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition"><FaEnvelope /></a>
                            <a href="#" className="p-2 bg-gray-800 text-white rounded-full hover:scale-110 transition"><FaGithub /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPasswordModal && (
                <div
                    className={`fixed inset-0 flex p-1 items-center justify-center bg-black bg-opacity-50 z-50 ${isModalClosing ? "modal-overlay-exit" : "modal-overlay-enter"
                        }`}
                    onClick={handleBackdropClick}
                >
                    <div
                        className={`bg-white w-full max-w-md rounded-md p-6 relative shadow-lg ${isModalClosing ? "modal-content-exit" : "modal-content-enter"
                            }`}
                    >
                        <button
                            onClick={closeForgotPasswordModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
                        >
                            <FaTimes />
                        </button>

                        <h3 className="text-lg font-semibold mb-2">Forgot Password</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Enter your email to receive a password reset link.
                        </p>

                        {message.text && (
                            <div
                                className={`mb-3 p-3 rounded text-sm border ${message.type === "error"
                                        ? "text-red-600 bg-red-50 border-red-200"
                                        : "text-green-600 bg-green-50 border-green-200"
                                    }`}
                            >
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border text-sm rounded-md text-gray-700 border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
                                placeholder="you@example.com"
                            />

                            <button
                                type="submit"
                                className="w-full py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition"
                            >
                                Send Reset Link
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <ToastContainer />
        </>
    );
};

export default Login;
