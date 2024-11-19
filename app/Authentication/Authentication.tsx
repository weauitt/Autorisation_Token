import React from "react";
import { getSession, Session } from "@auth0/nextjs-auth0";

interface User {
  name: string;
  email: string;
  picture: string;
}

export default async function Authentication() {
  const session = (await getSession()) as Session | null | undefined;
  
  const user = session?.user as User | undefined;

  return (
    <div className="flex flex-col items-end p-6 bg-gray-100 ">
      {!user ? (
        <div className="flex flex-col items-center">
          <a href="/api/auth/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
              Login
            </button>
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full mb-4"/>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <a href="/api/auth/logout">
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">
                Logout
              </button>
            </a>
            <a href="/api/auth/logout">
            </a>
          </div>
        </div>
      )}
    </div>
  );
}