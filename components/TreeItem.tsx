import Link from "next/link";
import { FC } from "react";
import { TreeItem } from "../lib/tree";

const TreeNode: FC<{ node: TreeItem; path: string }> = ({
  node: { children, value, current, pretty },
  path,
}) => {
  return (
    <>
      {value !== "root" && (
        <>
          {children.length > 0 ? (
            <span
              className={`text-left ${
                current
                  ? "text-black dark:text-white font-semibold"
                  : "text-gray-700 dark:text-gray-400"
              }`}
            >
              {pretty ? pretty : value}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Link href={path}>
                <a
                  className={`${
                    current
                      ? "font-semibold border-purple-700 dark:border-white text-purple-700 dark:text-white"
                      : "font-normal text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-gray-100 hover:border-gray-500 hover:dark:border-gray-400 border-transparent"
                  } first-letter transition-colors -ml-px hover:no-underline border-l pl-4`}
                >
                  {pretty ? pretty : value}
                </a>
              </Link>
            </span>
          )}
        </>
      )}

      {children.length > 0 && (
        <div
          className={`flex flex-col gap-1 ${
            value !== "root"
              ? "border-l border-gray-300 dark:border-gray-700"
              : ""
          }`}
        >
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
