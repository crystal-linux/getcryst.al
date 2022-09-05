import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC, useState } from "react";

const TreeNode: FC<{ node: node; path: string }> = ({
  node: { children, value, current },
  path,
}) => {
  const [toggled, setToggled] = useState(current);

  return (
    <>
      {/*{value !== "root" &&
        (children.length > 0 ? (
          <button onClick={() => setToggled(!toggled)} className="text-left">
            {value}
            <FontAwesomeIcon icon={toggled ? faCaretDown : faCaretLeft} />
          </button>
        ) : (
          <Link href={path}>
            <a className={`${current ? "text-purple-700" : ""}`}>{value}</a>
          </Link>
        ))}*/}

      {value !== "root" && (
        <>
          {children.length > 0 ? (
            <button
              onClick={() => setToggled(!toggled)}
              className={`text-left ${
                current ? "text-black font-semibold" : "text-gray-700 hover:text-black"
              }`}
            >
              <FontAwesomeIcon className="mr-2 text-gray-500" icon={toggled ? faCaretDown : faCaretLeft} />
              {value}
            </button>
          ) : (
            <Link href={path}>
              <a
                className={`${
                  current && children.length === 0 ? "text-purple-700" : ""
                } ${
                  current
                    ? "font-semibold"
                    : "font-normal text-gray-800 hover:text-black"
                } hover:no-underline`}
              >
                {value}
              </a>
            </Link>
          )}
        </>
      )}

      {toggled &&
        children.map((child) => (
          <TreeNode
            key={child.value}
            node={child}
            path={`${path}/${child.value}`}
          />
        ))}
    </>
  );
};

export default TreeNode;
