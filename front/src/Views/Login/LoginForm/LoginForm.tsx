import React, { useState } from "react";
import { useFetch } from "../../../Fetch";
import { BACKEND_ATOM, UserAtom } from "../../../Atoms";
import { useAtom } from "jotai";

export const LoginForm: React.FC = () => {
  const [BACKEND] = useAtom(BACKEND_ATOM);
  const [, setUser] = useAtom(UserAtom);
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
    //
    //

    response?.then((res: any) => {
      if (res.status !== 200) {
        setResponse(res);
      } else {
        res.json().then((res: any) => {
          console.log("id: ", res.id);
          console.log("name: ", res.name);
          console.log("email: ", res.email);
          setUser({ id: res.id, name: res.name, email });
        });
      }
    });

    //
    //
    setTimeout(() => {
      setResponse("");
    }, 5000);
  }

  return (
    <div style={{ fontFamily: "Raleway" }} className="bg-teal-600 py-4">
      <form className="flex flex-col items-center">
        <input
          className="peer my-4 w-5/6 rounded-md pl-1 text-center text-xl text-teal-900"
          value={email}
          onChange={onEmailChange}
          type="email"
          name="email"
          id="email"
        />
        <label
          className={`relative -top-11 h-0 text-xl text-lime-900 transition-all peer-focus-within:-top-18 peer-focus-within:font-medium peer-focus-within:text-amber-400 ${
            email === "" ? "-top-11" : "-top-18"
          }`}
          htmlFor="email"
        >
          Email
        </label>
        <div className="mb-8 h-7">
          <input
            className="peer my-4 w-5/6 rounded-md pl-1 text-center text-xl text-teal-900"
            value={password}
            onChange={onPasswordChange}
            type="password"
            name="password-login"
            id="password-login"
          />
          <label
            className={`relative -top-11 h-0 text-xl text-lime-900 transition-all peer-focus-within:-top-18 peer-focus-within:font-medium peer-focus-within:text-amber-400 ${
              password === "" ? "-top-11" : "-top-18"
            }`}
            htmlFor="password-login"
          >
            Password
          </label>
        </div>
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
