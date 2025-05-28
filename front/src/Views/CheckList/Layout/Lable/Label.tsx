import React from "react";

interface Props {
  owner: string;
  deadline: string;
  priority: string;
  checked: boolean;
}

const defaultClass = `#ea580c`;
const checkedClass = `#7c2d12`;

export const Label: React.FC<Props> = ({
  owner,
  deadline,
  priority,
  checked,
}) => {
  const color = checked ? checkedClass : defaultClass;

  const date = new Date(parseInt(deadline));
  const clearDate = date
    .toLocaleString()
    .replace(",", "")
    .replaceAll("/", ".")
    .slice(0, -3);

  return (
    <>
      <div
        style={{ fontFamily: "Itim", backgroundColor: color }}
        className={`mr-1 rounded-3xl px-1 font-mono text-xs transition-all duration-500`}
      >
        {owner}
      </div>
      <div
        style={{ fontFamily: "Itim", backgroundColor: color }}
        className={`mr-1 rounded-3xl px-1 font-mono text-xs transition-all duration-500`}
      >
        {priority}
      </div>
      <div
        style={{ fontFamily: "Itim", backgroundColor: color }}
        className={`mr-1 rounded-3xl px-1 font-mono text-xs transition-all duration-500`}
      >
        {clearDate}
      </div>
    </>
  );
};
