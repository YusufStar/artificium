"use client";
import React, { useEffect } from "react";
import { Mic, Paperclip, RotateCcw, Send } from "lucide-react";

// add input tag types
type Props = {
  value: string;
  setValue: (value: string) => void;
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "1.25rem";
      if (props.value !== "") {
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      } else {
        inputRef.current.style.height = "1.25rem";
      }
    }
  }, [inputRef, props.value]);

  return (
    <div className="w-full flex items-center p-24 bg-nobbleBlack-800 rounded-20 gap-24">
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
        onChange={props.onChange}
        placeholder={props.placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            props.onSubmit();
          } else if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            props.setValue(props.value + "\n");
          }
        }}
        className="w-full max-h-[15rem] flex items-center overflow-hidden resize-none disabled:opacity-50 transition-colors duration-200 bg-transparent text-nobbleBlack-300 placeholder:text-nobbleBlack-500 font-medium text-16 outline-none"
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
