"use client";

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React, { useState, useRef, useEffect, MouseEventHandler } from "react";

export interface FileNameItemProps {
  value: string;
  active: boolean;
  onClick: () => void;
  onEditComplete: (name: string) => void;
  creating?: boolean;
  onRemove: MouseEventHandler;
  readonly?: boolean;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const {
    value,
    active = false,
    onClick,
    onEditComplete,
    creating,
    onRemove,
    readonly,
  } = props;

  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(creating);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    if (readonly) {
      return;
    }
    setEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  // 对文件进行增删改查的时候 重新设置 srcdoc
  const handleInputBlur = () => {
    setEditing(false);
    onEditComplete(name);
  };

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus();
    }
  }, [creating]);

  return (
    <div
      className={`dark:bg-[#1D1D1D] bg-[#E2E2E2] mx-1 first:cursor-text inline-flex px-2 py-1 text-sm cursor-pointer items-center hover:text-sky-400 ${ active ? "text-sky-400" : "dark:text-gray-400 text-gray-800" } whitespace-nowrap shirnk-0`}
      onClick={onClick}
    >
      {editing ? (
        <Input
          ref={inputRef}
          className="text-sm min-w-28"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleInputBlur();
            }
          }}
        />
      ) : (
        <>
          <span onDoubleClick={handleDoubleClick}>{name}</span>
          {!readonly && <X className="ml-1 w-4 h-4" onClick={onRemove}/>}
        </>
      )}
    </div>
  );
};
