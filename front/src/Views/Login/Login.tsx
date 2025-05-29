import React from "react";
import { LoginForm } from "./LoginForm/LoginForm";

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-teal-800 text-amber-400">
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
