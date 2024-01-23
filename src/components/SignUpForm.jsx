import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  auth,
  storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from "../firebase-config";

function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    profileImage: null,
    displayName: "", // Added displayName field
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "", // Added displayName field
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

  const validateConfirmPassword = () => {
    if (formData.confirmPassword !== formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  const validateDisplayName = () => {
    if (formData.displayName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        displayName: "Display Name is required",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, displayName: "" }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, profileImage: file }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      agreeTerms: !prevData.agreeTerms,
    }));
  };

  const handleBlur = (field) => {
    switch (field) {
      case "email":
        validateEmail();
        break;
      case "password":
        validatePassword();
        break;
      case "confirmPassword":
        validateConfirmPassword();
        break;
      case "displayName":
        validateDisplayName();
        break;
      default:
        break;
    }
  };

  const showError = (field) => {
    return errors[field] && formData[field].trim() !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Additional validation for displayName
    validateDisplayName();

    // Check if there are any errors before proceeding
    if (Object.values(errors).some((error) => error !== "")) {
      console.log("Form has errors. Please fix them.");
      return;
    }

    // Add your form submission logic here
    console.log("Form submitted:", formData);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, {
        displayName: formData.displayName,
      });

      // Upload blog image to Firebase Storage
      if (formData.profileImage) {
        const imageRef = ref(storage, `profileImage/${uuidv4()}`);

        await uploadBytes(imageRef, formData.profileImage)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then(async (url) => {
                // Update the blog document with the image URL
                await updateProfile(user, {
                  photoURL: url,
                });
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      }

      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
    }
  };

  return (
    <div className="w-full h-full max-w-lg basis-2/3 bg-white shadow-lg rounded-lg p-6 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3.5 cursor-pointer shrink-0 fill-[#333] hover:fill-red-500 float-right"
        viewBox="0 0 320.591 320.591"
      >
        {/* ... (SVG path data) */}
      </svg>
      <div className="my-6 text-center">
        <h4 className="text-3xl text-[#333] font-Playfair font-extrabold">
          Sign Up
        </h4>
        <p className="text-sm text-gray-400 mt-4 ">Create an account with us</p>
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
            <p className="text-xs text-red-500 mt-1">{errors.displayName}</p>
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
            <a
              href="javascript:void(0)"
              className="text-sm text-blue-600 font-semibold"
            >
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
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-3 !mt-12 w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-full"
        >
          Create Account
        </button>
        <p className="text-sm text-center">Or</p>
        <button
          type="button"
          className="px-6 py-3 w-full font-semibold bg-gray-200 hover:bg-gray-300 text-[#333] rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22px"
            fill="#fff"
            class="inline mr-2"
            viewBox="0 0 512 512"
          ></svg>
          Continue with Google
        </button>
      </form>
      <hr className="my-6" />
      <p className="text-sm text-center text-[#333]">
        Already have an account?{" "}
        <Link to="/signin" className="text-sm text-blue-600 font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default SignUpForm;
