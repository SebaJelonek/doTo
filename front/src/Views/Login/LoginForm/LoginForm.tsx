import React, { useState } from "react";
import { useFetch } from "../../../Fetch";
import { BACKEND_ATOM } from "../../../Atoms";
import { useAtom } from "jotai";

export const LoginForm: React.FC = () => {
  const [BACKEND] = useAtom(BACKEND_ATOM);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value);
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  function onSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let response = useFetch("POST", `${BACKEND}/api/login`, {
      email,
      password,
    });
    response?.then((res) => {
      if (res[0] !== 200) {
        res[1].then((res: string) => {
          setResponse(res);
        });
      }
    });
    setTimeout(() => {
      setResponse("");
    }, 5000);
  }

  return (
    <div style={{ fontFamily: "Raleway" }} className="bg-teal-600 py-4">
      <form className="flex flex-col items-center">
        <input
          className="my-4 w-5/6 rounded-md pl-1 text-center text-xl text-teal-900"
          value={email}
          onChange={onEmailChange}
          type="email"
          name="email"
          id="email"
        />
        <input
          className="my-4 w-5/6 rounded-md pl-1 text-center text-xl text-teal-900"
          value={password}
          onChange={onPasswordChange}
          type="password"
          name="password"
          id="password"
        />
        <button
          className="my-2 h-7 w-2/3 rounded-lg bg-slate-900 text-lg font-medium text-lime-300"
          type="button"
          onClick={onSubmit}
        >
          Login
        </button>
      </form>
      {response !== "" && response}
    </div>
  );
};
