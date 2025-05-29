import React, { useState } from "react";
import { useFetch } from "../../../Fetch";
import { BACKEND_ATOM } from "../../../Atoms";
import { useAtom } from "jotai";

export const RegisterForm: React.FC = () => {
  const [BACKEND] = useAtom(BACKEND_ATOM);
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
      response?.then((res) => {
        if (res[0] !== 200) {
          res[1].then((res: string) => {
            setResponse(res);
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
          className="my-4 w-5/6 rounded-md pl-1 text-center text-xl text-teal-900"
          value={email}
          onChange={onEmailChange}
          type="email"
          name="email"
          id="email"
        />
        <input
          className="my-4 w-5/6 rounded-md pl-1 text-center text-xl text-teal-900"
          value={username}
          onChange={onUsernameChange}
          type="text"
          name="username"
          id="username"
        />
        <input
          className="my-4 w-5/6 rounded-md pl-1 text-center text-xl text-teal-900"
          value={password}
          onChange={onPasswordChange}
          type="password"
          name="password"
          id="password"
        />
        <input
          className="my-4 w-5/6 rounded-md pl-1 text-center text-xl text-teal-900"
          value={passwordCheck}
          onChange={onPasswordCheckChange}
          type="password"
          name="passwordCheck"
          id="passwordCheck"
        />
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
