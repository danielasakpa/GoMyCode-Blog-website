import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import BlogImg from "../assets/img/demo/intro.jpg";
import Loader from "../components/Loader";

function SignUp() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex jusitfy-between py-[30px]">
      <SignUpForm setLoading={setLoading} />
      <img src={BlogImg} alt="" className="basis-2/3 w-full h-[100%]" />
    </div>
  );
}

export default SignUp;
