import React, { useState } from "react";
import { useFetch } from "../../../Fetch";
import { BACKEND_ATOM, UserAtom } from "../../../Atoms";
import { useAtom } from "jotai";

export const RegisterForm: React.FC = () => {
  const [BACKEND] = useAtom(BACKEND_ATOM);
  const [user, setUser] = useAtom(UserAtom);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [response, setResponse] = useState("");

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value);
  }

  function onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.currentTarget.value);
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  function onPasswordCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordCheck(e.currentTarget.value);
  }

  function onSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (password !== passwordCheck) {
      console.log(password === passwordCheck);

      setResponse("Passwords do not match");
    } else {
      let response = useFetch("POST", `${BACKEND}/api/user`, {
        email,
        username,
        password,
        passwordCheck,
      });

      response?.then((res: any) => {
        if (res.status !== 200) {
          console.log(user);
          setResponse(res);
        } else {
          res.json().then((res: any) => {
            const newUser = { id: res.id, name: username, email };
            setUser(newUser);
            setTimeout(() => {
              console.log(newUser);
            }, 5050);
          });
        }
      });
    }

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
          name="email-register"
          id="email-register"
        />
        <label
          className={`relative -top-11 h-0 text-xl text-lime-900 transition-all peer-focus-within:-top-18 peer-focus-within:font-medium peer-focus-within:text-amber-400 ${
            email === "" ? "-top-11" : "-top-18"
          }`}
          htmlFor="email-register"
        >
          Provide Email
        </label>
        <div className="mb-8 h-7">
          <input
            className="peer my-4 w-5/6 rounded-md pl-1 text-center text-xl text-teal-900"
            value={username}
            onChange={onUsernameChange}
            type="text"
            name="username"
            id="username"
          />{" "}
          <label
            className={`relative -top-11 h-0 text-xl text-lime-900 transition-all peer-focus-within:-top-18 peer-focus-within:font-medium peer-focus-within:text-amber-400 ${
              username === "" ? "-top-11" : "-top-18"
            }`}
            htmlFor="username"
          >
            Provide Username
          </label>
        </div>
        <div className="mb-8 h-7">
          <input
            className="peer my-4 w-5/6 rounded-md pl-1 text-center text-xl text-teal-900"
            value={password}
            onChange={onPasswordChange}
            type="password"
            name="password-register"
            id="password-register"
          />
          <label
            className={`relative -top-11 h-0 text-xl text-lime-900 transition-all peer-focus-within:-top-18 peer-focus-within:font-medium peer-focus-within:text-amber-400 ${
              password === "" ? "-top-11" : "-top-18"
            }`}
            htmlFor="password-register"
          >
            Provide Password
          </label>
        </div>
        <div className="mb-8 h-7">
          <input
            className="peer my-4 w-5/6 rounded-md pl-1 text-center text-xl text-teal-900"
            value={passwordCheck}
            onChange={onPasswordCheckChange}
            type="password"
            name="password-check"
            id="password-check"
          />
          <label
            className={`relative -top-11 h-0 text-xl text-lime-900 transition-all peer-focus-within:-top-18 peer-focus-within:font-medium peer-focus-within:text-amber-400 ${
              passwordCheck === "" ? "-top-11" : "-top-18"
            }`}
            htmlFor="password-check"
          >
            Pasword Check
          </label>
        </div>
        <button
          className="my-2 h-7 w-2/3 rounded-lg bg-slate-900 text-lg font-medium text-lime-300"
          type="button"
          onClick={onSubmit}
        >
          Register
        </button>
      </form>
      {response !== "" && response}
    </div>
  );
};
