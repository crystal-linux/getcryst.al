import Link from "next/link";
import { FC } from "react";
import { ITreeItem } from "../lib/tree";

const TreeNode: FC<{ node: ITreeItem; path: string }> = ({
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
                current ? "font-semibold" : ""
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
                      ? "border-ctp-mauve font-semibold text-ctp-mauve"
                      : "border-transparent font-normal text-ctp-subtext0 hover:border-ctp-surface2 hover:text-ctp-subtext1"
                  } first-letter -ml-px border-l pl-4 no-underline transition-colors hover:no-underline`}
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
            value !== "root" ? "border-l border-ctp-surface0" : ""
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
