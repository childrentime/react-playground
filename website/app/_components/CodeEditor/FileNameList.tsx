"use client";

import { useEffect, useState } from "react";
import { usePlaygroundStore } from "../store";
import { FileNameItem } from "./FileNameItem";
import { ENTRY_FILE_NAME, readonlyFileNames } from "../files";
import { SquarePlus } from "lucide-react";

export function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = usePlaygroundStore();

  const [tabs, setTabs] = useState([""]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);
    setCreating(false);
  };

  const addTab = () => {
    let index = 0;
    let newFileName = "Comp" + (index === 0 ? '': index) + ".tsx";
    while(files[newFileName]) {
      index++;
      newFileName = "Comp" + (index === 0 ? '': index) + ".tsx";
    }
    addFile(newFileName);
    setSelectedFileName(newFileName);
    setCreating(true);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  return (
    <div className="flex items-center max-h-[80px] overflow-x-auto overflow-y-hidden w-full bg-secondary-background shrink-0">
      <SquarePlus className="mx-3 cursor-pointer w-5 h-5 shrink-0" onClick={addTab} />
      <div className="py-2 flex items-center h-[38px]">
        {tabs.map((item, index, arr) => (
          <FileNameItem
            key={item + index}
            value={item}
            active={selectedFileName === item}
            onClick={() => setSelectedFileName(item)}
            onEditComplete={(name: string) => handleEditComplete(name, item)}
            creating={creating && index === arr.length - 1}
            readonly={readonlyFileNames.includes(item)}
            onRemove={(e) => {
              e.stopPropagation();
              handleRemove(item);
            }}
          ></FileNameItem>
        ))}
      </div>
    </div>
  );
}
