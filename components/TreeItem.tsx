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
                  ? "font-semibold"
                  : ""
              } text-ctp-text`}
            >
              {pretty ? pretty : value}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Link href={path}>
                <a
                  className={`${
                    current
                      ? "font-semibold border-ctp-mauve text-ctp-mauve"
                      : "font-normal text-ctp-subtext0 hover:text-ctp-subtext1 hover:border-ctp-surface2 border-transparent"
                  } first-letter transition-colors no-underline -ml-px hover:no-underline border-l pl-4`}
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
              ? "border-l border-ctp-surface0"
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
