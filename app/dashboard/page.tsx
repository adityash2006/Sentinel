"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/signin");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status !== 201) {
        router.replace("/signin");
      } else {
        setAuthorized(true);
      }

      setChecking(false);
    }

    checkAuth();
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    router.replace("/signin");
  }

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Checking authentication...
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <>
      <div className="text-7xl text-blue-600 text-center p-4">
        This route only opens for a logged in user
      </div>

      <div className="text-center">
        <button
          className="border-2 cursor-pointer rounded-lg p-2"
          onClick={logout}
        >
          LOGOUT
        </button>
      </div>
    </>
  );
}