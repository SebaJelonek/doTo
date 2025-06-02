import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { animated, useSpring } from "@react-spring/web";
import { UserAtom, marginLeftAtom } from "../../Atoms";
import { Register } from "../../Views/Register/Register";
import { Login } from "../../Views/Login/Login";

interface Props {
  setId: React.Dispatch<React.SetStateAction<number>>;
}

export const UserContainer: React.FC<Props> = ({ setId }) => {
  const [user] = useAtom(UserAtom);
  const [marginLeft] = useAtom(marginLeftAtom);
  const { marginLeftOffset } = useSpring({
    marginLeftOffset: marginLeft,
  });

  useEffect(() => {
    setId(user.id);
  }, [user.id, setId]);

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
