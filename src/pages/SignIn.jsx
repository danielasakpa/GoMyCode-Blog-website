import React, { useState } from "react";
import SignInForm from "../components/SignInForm";
import BlogImg from "../assets/img/demo/intro.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path accordingly
import Loader from "../components/Loader";

function SignIn() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    navigate("/");
  }

  return (
    <div className="flex jusitfy-between items-center h-[760px] py-[30px]">
      <SignInForm setLoading={setLoading} />
      <img src={BlogImg} alt="" className="basis-2/3 w-full h-full" />
    </div>
  );
}

export default SignIn;
