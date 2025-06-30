import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { animated, useSpring } from "@react-spring/web";
import { BACKEND_ATOM, UserAtom, marginLeftAtom } from "../../Atoms";
import { Register } from "../../Views/Register/Register";
import { Login } from "../../Views/Login/Login";
import { useFetch } from "../../Fetch";

interface Props {
  setId: React.Dispatch<React.SetStateAction<number>>;
}

export const UserContainer: React.FC<Props> = ({ setId }) => {
  const [user, setUser] = useAtom(UserAtom);
  const [marginLeft] = useAtom(marginLeftAtom);
  const { marginLeftOffset } = useSpring({
    marginLeftOffset: marginLeft,
  });
  const [BACKEND] = useAtom(BACKEND_ATOM);

  useEffect(() => {
    setId(user.id);
  }, [user]);

  useEffect(() => {
    const response = useFetch("GET", `${BACKEND}/api/session`);
    response?.then((res: any) => {
      if (res !== undefined) {
        res[0].then((val: any) => {
          setUser(val);
        });
      }
    });
  }, []);

  return (
    <animated.div
      className="bg flex overflow-x-hidden"
      style={{
        marginLeft: marginLeftOffset,
        // transform,
        backgroundColor: "#0f172a",
      }}
    >
      <Login />
      <Register />
    </animated.div>
  );
};
