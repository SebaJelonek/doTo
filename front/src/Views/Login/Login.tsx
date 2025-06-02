import React from "react";
import { LoginForm } from "./LoginForm/LoginForm";
import { heightAtom, widthAtom } from "../../Atoms";
import { useAtom } from "jotai";

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
        className="font pt-32 pb-20 text-4xl font-medium"
      >
        LOGIN PAGE
      </h1>
      <LoginForm />
    </div>
  );
};
