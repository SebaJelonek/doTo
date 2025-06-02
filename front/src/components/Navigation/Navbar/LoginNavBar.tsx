import React, { useState } from "react";
import { useAtom } from "jotai";
import { marginLeftAtom } from "../../../Atoms";
import NavIcon from "../NavIcon/NavIcon";
import Register from "../../../assets/Icons/add-user.png";
import Login from "../../../assets/Icons/login.png";

const siteArray = [Login, Register];

const LoginNavbar: React.FC = () => {
  const [active, setActive] = useState("/src/assets/Icons/login.png");
  const [, setMarginLeft] = useAtom(marginLeftAtom);

  const currentSite = (site: string) => {
    siteArray.filter((element, index) => {
      element === site && setMarginLeft(-window.screen.width * index);
      setActive(site);
    });
  };

  return (
    <nav className="sticky bottom-0 z-20 h-15 bg-neutral-600">
      <div className="m-auto flex h-full w-4/5 justify-between">
        {siteArray.map((src) => (
          <NavIcon
            src={src}
            key={src}
            currentSite={currentSite}
            active={active}
          />
        ))}
      </div>
    </nav>
  );
};

export { LoginNavbar };
