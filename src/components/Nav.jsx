import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path accordingly

function Nav() {
  const Links = [
    {
      path: "/",
      name: "Intro",
    },
    {
      path: "/",
      name: "Culture",
    },
    {
      path: "/",
      name: "Tech",
    },
    {
      path: "/",
      name: "Politics",
    },
    {
      path: "/",
      name: "Health",
    },
    {
      path: "/",
      name: "Collections",
    },
    {
      path: "/",
      name: "About",
    },
  ];

  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 py-3 bg-white">
      <div className="flex items-center text-[#202428]">
        <Link className="mr-20" to="/">
          <span className="font-Playfair text-[20px] leading-[0] m-0 p-0 font-bold">
            Mundana
          </span>
        </Link>
        <div className="flex items-center justify-between w-full h-full">
          <ul className="flex space-x-8">
            {Links.map((link, id) => (
              <li key={id} className="font-Source text-[16px] text-[#9B9B9B]">
                <Link className="" to={`${link.path}`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  className="block px-12 py-1 bg-[#03A87C] border hover:border-[#03A87C] hover:text-[#03A87C] hover:bg-[#fff] text-white rounded"
                  to="/create-blog"
                >
                  Create Blog +
                </Link>
                <Link
                  to="/profile"
                  className="rounded-full p-1 border border-[#03A87C]"
                >
                  <img
                    src={user?.photoURL}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </Link>
              </>
            ) : (
              <Link
                className="block px-12 py-1 bg-[#03A87C] border hover:border-[#03A87C] hover:text-[#03A87C] hover:bg-[#fff] text-white rounded"
                to="/signup"
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
