import React from "react";
import { RegisterForm } from "./RegisterForm/RegisterForm";

export const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-teal-800 text-amber-400">
      <h1
        style={{ fontFamily: "Raleway" }}
        className="font pt-32 pb-20 text-4xl font-medium"
      >
        REGISTER PAGE
      </h1>
      <RegisterForm />
    </div>
  );
};
