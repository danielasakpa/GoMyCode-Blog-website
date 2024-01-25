import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../util/firebase-config";
import { useAuth } from "../context/AuthContext"; // Adjust the path accordingly

function SignInForm({ setLoading }) {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = () => {
    if (!formData.email.includes("@")) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const validatePassword = () => {
    if (formData.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBlur = (field) => {
    switch (field) {
      case "email":
        validateEmail();
        break;
      case "password":
        validatePassword();
        break;
      default:
        break;
    }
  };

  const showError = (field) => {
    return errors[field] && formData[field].trim() !== "";
  };

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      setLoading(false);
      if (userCredential.user) {
        setUser(userCredential.user);
        navigate("/profile");
      }
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center w-full h-[100%] max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
      <div className="w-full">
        <div className="my-6 text-center">
          <h4 className="text-3xl text-[#333] font-extrabold">Sign In</h4>
          <p className="text-sm text-gray-400 mt-4">
            Welcome back! Sign in to your account
          </p>
        </div>
        <form className="space-y-4">
          <div className="relative flex flex-col">
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onBlur={() => handleBlur("email")}
              onChange={handleInputChange}
              className={`px-4 py-3 bg-white text-[#333] text-sm border-2 outline-[#007bff] rounded-lg ${
                showError("email") ? "border-red-500" : ""
              }`}
            />
            {showError("email") && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="relative flex flex-col">
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onBlur={() => handleBlur("password")}
              onChange={handleInputChange}
              className={`px-4 py-3 bg-white text-[#333] text-sm border-2 outline-[#007bff] rounded-lg ${
                showError("password") ? "border-red-500" : ""
              }`}
            />
            {showError("password") && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 !mt-12 w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            Sign In
          </button>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-sm text-blue-600 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>
        <hr className="my-6" />
        <p className="text-sm text-center text-[#333]">
          Forgot your password?{" "}
          <a
            href="javascript:void(0)"
            className="text-sm text-blue-600 font-semibold"
          >
            Reset Password
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignInForm;
