import { messageNormalize } from "@/lib/formater";
import { cn } from "@/lib/utils";
import React from "react";

/*
{
    "id": "clu03stxu0008cax3djq2becb",
    "content": "test",
    "createdAt": "2024-03-20T17:55:00.004Z",
    "updatedAt": "2024-03-20T17:55:00.004Z",
    "authorId": "cltswcuhj0000h9b0t12f8c7z",
    "artificiumId": "cltxen7pt00059uu360f8e9ik"
}
*/

type Author = {
  id: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
};

type Message = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
};

type Props = {
  message: Message;
  className?: string;
};

const Message = (props: Props) => {
  const timeDiff = (time: string) => {
    const currentTime = new Date().getTime();
    const messageTime = new Date(time).getTime();
    const diff = currentTime - messageTime;
    if (diff < 60000) {
      return "just now";
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)} min`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)} hour`;
    } else if (diff < 604800000) {
      return `${Math.floor(diff / 86400000)} day`;
    } else if (diff < 2592000000) {
      return `${Math.floor(diff / 604800000)} week`;
    } else if (diff < 31536000000) {
      return `${Math.floor(diff / 2592000000)} month`;
    } else {
      return `${Math.floor(diff / 31536000000)} year`;
    }
  };

  return (
    <div
      className={cn("flex flex-col p-16 rounded-16 border", props.className)}
    >
      <div className="flex items-center">
        <img
          className="w-48 h-48 object-cover mr-24 rounded-20"
          src={props.message.author.profilePhoto}
        />

        <span className="text-16 font-semibold text-white">
          {props.message?.author?.firstName}
        </span>

        <span className="text-12 font-medium ml-12 text-nobbleBlack-400">
          {timeDiff(props.message?.createdAt)}
        </span>
      </div>

      <div className="flex flex-col pl-72 w-full text-nobbleBlack-300 font-medium">
        {messageNormalize(props.message.content)}
      </div>
    </div>
  );
};

export default Message;
