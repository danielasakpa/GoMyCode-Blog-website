import React from "react";
import SignInForm from "../components/SignInForm";
import BlogImg from "../assets/img/demo/intro.jpg";

function SignIn() {
  return (
    <div className="flex jusitfy-between items-center h-[760px] py-[30px]">
      <SignInForm />
      <img src={BlogImg} alt="" className="basis-2/3 w-full h-full" />
    </div>
  );
}

export default SignIn;
