"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Main = () => {
  const getUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  };

  const [user, setUser] = useState(getUser());

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <div className="min-h-[100vh] flex flex-col items-center justify-center">
        {user ? (
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl">
              Welcome <b>{user.result.userName}</b>
            </h1>
            <h3 className="text-xl">
              You are logged in as <b>{user.result.userType.toUpperCase()}</b>
            </h3>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* <Link
              href={"/login"}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-800"
            >
              Login
            </Link> */}
            <h1 className="text-3xl font-bold text-center">
              You are not Logged in
            </h1>
          </>
        )}
      </div>
    </>
  );
};

export default Main;
