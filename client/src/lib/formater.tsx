"use client";

import { JSXElementConstructor, ReactElement } from "react";

export const messageNormalize = (message: string) => {
  const cols = message.split("\n");
  const linkRegex = /(https?:\/\/[^\s]+)/g;

  return cols
    .map((col, idx) => {
      if (col === "") {
        return <br key={idx} />;
      } else if (linkRegex.test(col)) {
        const links = col.split(linkRegex);

        return links.map((link, idx) => {
          if (linkRegex.test(link)) {
            return (
              <a
                className="text-blue-500"
                key={idx}
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                {link.replace(/(^\w+:|^)\/\//, "")}
              </a>
            );
          } else {
            return link;
          }
        });
      }

      return col;
    })
    .map((col, idx) => {
      return <span key={idx}>{col}</span>;
    });
};
