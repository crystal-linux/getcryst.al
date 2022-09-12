import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC, useState } from "react";
import { TreeItem } from "../lib/tree";

const TreeNode: FC<{ node: TreeItem; path: string }> = ({
  node: { children, value, current, pretty },
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
              className={`text-left mt-1 ${
                current
                  ? "text-black dark:text-white font-semibold"
                  : "text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-gray-100"
              }`}
            >
              <FontAwesomeIcon
                className="mr-1 text-gray-500"
                icon={toggled ? faCaretDown : faCaretRight}
                fixedWidth={true}
              />
              {pretty ? pretty : value}
            </button>
          ) : (
            <span className="flex items-center gap-2">
              <span className="text-gray-500">•</span>
              <Link href={path}>
                <a
                  className={`${
                    current && children.length === 0 ? "text-purple-700 dark:text-white" : ""
                  } ${
                    current
                      ? "font-semibold"
                      : "font-normal text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-gray-100"
                  } hover:no-underline mt-1`}
                >
                  {pretty ? pretty : value}
                </a>
              </Link>
            </span>
          )}
        </>
      )}

      {toggled && children.length > 0 && (
        <div className={`flex flex-col pl-2 ml-1 ${value !== "root" ? "border-l-gray-300 border-l" : ""}`}>
          {children.map((child) => (
            <TreeNode
              key={child.value}
              node={child}
              path={`${path}/${child.value}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TreeNode;
