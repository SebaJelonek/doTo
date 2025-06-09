import React, { useEffect } from "react";
import { LoginForm } from "./LoginForm/LoginForm";
import { BACKEND_ATOM, heightAtom, widthAtom } from "../../Atoms";
import { useAtom } from "jotai";
import { useFetch } from "../../Fetch";

export const Login: React.FC = () => {
  const [width] = useAtom(widthAtom);
  const [height] = useAtom(heightAtom);

  return (
    <div
      className="min-h-screen bg-teal-800 text-amber-400"
      style={{ minHeight: height - 60, minWidth: width }}
    >
      <h1
        style={{ fontFamily: "Raleway" }}
        className="font pb-20 pt-32 text-4xl font-medium"
      >
        LOGIN PAGE
      </h1>
      <LoginForm />
    </div>
  );
};
