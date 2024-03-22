"use client";
import React from "react";
import { Mic, Paperclip, RotateCcw, Send } from "lucide-react";

// add input tag types
type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  soundRecord: boolean;
  type: HTMLInputElement["type"];
  fileInput: boolean;
  placeholder: string;
  onSubmit: () => void;
  loading: boolean;
};

const MessageInput = (props: Props) => {
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  const autoCalcHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }

    props.onChange(e);
  };

  return (
    <div className="w-full flex p-24 bg-nobbleBlack-800 rounded-20 gap-24">
      {props.soundRecord && (
        <button
          disabled={props.loading}
          className="w-48 h-48 flex-shrink-0 group flex disabled:opacity-50 transition-all duration-200 items-center justify-center"
        >
          <Mic
            size="20"
            color="#686B6E"
            className="group-hover:stroke-nobbleBlack-500 transition-colors duration-200 ease-in-out"
          />
        </button>
      )}

      <textarea
        ref={inputRef}
        disabled={props.loading}
        value={props.value}
        onChange={(e) => autoCalcHeight(e)}
        placeholder={props.placeholder}
        className="w-full h-48 flex items-center disabled:opacity-50 transition-all duration-200 bg-transparent text-nobbleBlack-300 placeholder:text-nobbleBlack-500 font-medium text-16 outline-none"
      />

      {props.fileInput && (
        <button
          disabled={props.loading}
          className="w-48 h-48 flex-shrink-0 group flex disabled:opacity-50 transition-all duration-200 items-center justify-center"
        >
          <Paperclip
            size="20"
            color="#686B6E"
            className="group-hover:stroke-nobbleBlack-500 transition-colors duration-200 ease-in-out"
          />
        </button>
      )}

      <button
        disabled={props.loading}
        onClick={props.onSubmit}
        className="w-48 h-48 flex-shrink-0 disabled:opacity-50 transition-all duration-200 bg-nobbleBlack-600 rounded-12 flex items-center justify-center"
      >
        {props.loading ? (
          <RotateCcw size="16" color="#CDCECF" className="animate-spin" />
        ) : (
          <Send size="16" color="#CDCECF" />
        )}
      </button>
    </div>
  );
};

export default MessageInput;
