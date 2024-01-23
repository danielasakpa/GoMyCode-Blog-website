import React from "react";
import SignUpForm from "../components/SignUpForm";
import BlogImg from "../assets/img/demo/intro.jpg";

function SignUp() {
  return (
    <div className="flex jusitfy-between py-[30px]">
      <SignUpForm />
      <img src={BlogImg} alt="" className="basis-2/3 w-full h-[100%]" />
    </div>
  );
}

export default SignUp;
