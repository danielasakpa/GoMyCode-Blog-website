import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../util/firebase-config";
import { useAuth } from "../context/AuthContext";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../util/formValidation";
import AuthForm from "./AuthForm";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBlur = (field) => {
    switch (field) {
      case "email":
        validateEmail(setErrors, formData);
        break;
      case "password":
        validatePassword(setErrors, formData);
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
      setLoading(false);
      console.error(error.code);
      console.error(error.message);
    }
  };

  return (
    <AuthForm
      formType="signin"
      handleSubmit={handleSubmit}
      handleBlur={handleBlur}
      handleInputChange={handleInputChange}
      showError={showError}
      formData={formData}
      errors={errors}
    />
  );
}

export default SignInForm;
