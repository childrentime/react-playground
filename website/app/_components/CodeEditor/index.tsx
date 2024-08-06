"use client";

import { Editor } from "./Editor";
import { FileNameList } from "./FileNameList";
import { usePlaygroundStore } from "../store";
import { debounce } from "lodash-es";

export function CodeEditor() {
  const { files, setFiles, selectedFileName, setSelectedFileName } =
  usePlaygroundStore()

  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    setFiles({ ...files });
  }

  return (
    <div className="flex flex-col h-full">
      <FileNameList />
      <Editor file={file} onChange={debounce(onEditorChange, 50)} />
    </div>
  );
}
