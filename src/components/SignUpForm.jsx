import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  auth,
  storage,
  getDownloadURL,
  ref,
  db,
  doc,
  uploadBytes,
  serverTimestamp,
} from "../util/firebase-config";
import { setDoc } from "firebase/firestore";
import {
  validateEmail,
  validateDisplayName,
  validatePassword,
  validateConfirmPassword,
} from "../util/formValidation";
import AuthForm from "./AuthForm";

function SignUpForm({ setLoading }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    profileImage: null,
    displayName: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

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
        validateEmail(setErrors, formData);
        break;
      case "password":
        validatePassword(setErrors, formData);
        break;
      case "confirmPassword":
        validateConfirmPassword(setErrors, formData);
        break;
      case "displayName":
        validateDisplayName(setErrors, formData);
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
      console.error("Form has errors. Please fix them.");
      return;
    }

    setLoading(true);

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
                await setDoc(doc(db, "users", userCredential.user.uid), {
                  displayName: formData.displayName,
                  email: formData.email,
                  photoURL: url,
                  timeStamp: serverTimestamp(),
                });
                setLoading(false);
              })
              .catch((error) => {
                setLoading(false);
                console.error(error.message);
              });
          })
          .catch((error) => {
            setLoading(false);
            console.error(error.message);
          });
      }

      navigate("/signin");
    } catch (error) {
      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
    }
  };

  return (
    <AuthForm
      formType="signup"
      handleSubmit={handleSubmit}
      handleBlur={handleBlur}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      handleCheckboxChange={handleCheckboxChange}
      showError={showError}
      formData={formData}
      errors={errors}
    />
  );
}

export default SignUpForm;
