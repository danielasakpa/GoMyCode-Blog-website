import React from "react";
import { Link } from "react-router-dom";

function AuthForm({
  formType,
  handleSubmit,
  handleBlur,
  handleInputChange,
  handleImageChange,
  handleCheckboxChange,
  showError,
  formData,
  errors,
}) {
  return (
    <div className="w-full h-full max-w-lg basis-2/3 bg-white shadow-lg rounded-lg p-6 relative">
      <div className="my-6 text-center">
        <h4 className="text-3xl text-[#333] font-Playfair font-extrabold">
          {formType === "signin" ? "Sign In" : "Sign Up"}
        </h4>
        <p className="text-sm text-gray-400 mt-4">
          {formType === "signin"
            ? "Welcome back! Sign in to your account"
            : "Create an account with us"}
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
        {/* Common fields for both sign-in and sign-up */}
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
        {formType === "signup" && (
          <>
            <div className="relative flex flex-col">
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onBlur={() => handleBlur("confirmPassword")}
                onChange={handleInputChange}
                className={`px-4 py-3 bg-white text-[#333] text-sm border-2 outline-[#007bff] rounded-lg ${
                  showError("confirmPassword") ? "border-red-500" : ""
                }`}
              />
              {showError("confirmPassword") && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div className="relative flex flex-col">
              <input
                type="text"
                placeholder="Enter Display Name"
                name="displayName"
                value={formData.displayName}
                onBlur={() => handleBlur("displayName")}
                onChange={handleInputChange}
                className={`px-4 py-3 bg-white text-[#333] text-sm border-2 outline-[#007bff] rounded-lg ${
                  showError("displayName") ? "border-red-500" : ""
                }`}
              />
              {showError("displayName") && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.displayName}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleCheckboxChange}
                className="w-4"
              />
              <label className="text-sm ml-4 text-[#333]">
                I have read and accept the{" "}
                <a href="" className="text-sm text-blue-600 font-semibold">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <div className="relative flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="px-4 py-3 bg-white text-[#333] text-sm border-2 outline-[#007bff] rounded-lg"
              />
            </div>
          </>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-3 !mt-12 w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full"
        >
          {formType === "signin" ? "Sign In" : "Create Account"}
        </button>
        <p className="text-sm text-center">
          {formType === "signin"
            ? "Don't have an account? "
            : "Already have an account? "}
          <Link
            to={formType === "signin" ? "/signup" : "/signin"}
            className="text-sm text-blue-600 font-semibold"
          >
            {formType === "signin" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </form>
      {formType === "signin" && (
        <>
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
        </>
      )}
    </div>
  );
}

export default AuthForm;
