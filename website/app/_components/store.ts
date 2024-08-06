"use client";
import { create } from "zustand";
import { compress, fileName2Language, uncompress } from "@/app/_utils";
import { IMPORT_MAP_FILE_NAME, initFiles } from "./files";
import { nanoid } from "nanoid";
import { produce } from "immer";

export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [key: string]: File;
}

interface PlaygroundStore {
  files: Files;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: (files: Files) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (oldFieldName: string, newFieldName: string) => void;
  previewKey: string;
  refreshPreview: () => void;
  setImportMap: (importMap: string) => void;
}

const getFilesFromUrl = () => {
  let files: Files | undefined;
  try {
    if(typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const uncompressedHash = uncompress(hash);
    files = JSON.parse(uncompressedHash);
  } catch (error) {
    console.error(error);
  }
  return files;
};

export const usePlaygroundStore = create<PlaygroundStore>((set, get) => ({
  previewKey: nanoid(),
  files: getFilesFromUrl() ?? initFiles,
  selectedFileName: "App.tsx",
  refreshPreview: () => set({ previewKey: nanoid() }),

  setSelectedFileName: (fileName: string) =>
    set({ selectedFileName: fileName }),

  setFiles: (files: Files) => set({ files }),
  setImportMap: (importMap: string) => {
    const files = get().files;
    if (files[IMPORT_MAP_FILE_NAME].value === importMap) {
      return;
    }
    const newFiles = produce(files, (draft) => {
      draft[IMPORT_MAP_FILE_NAME].value = importMap;
    });

    set({ files: newFiles });
  },

  addFile: (name: string) =>
    set((state) => {
      const newFiles = { ...state.files };
      newFiles[name] = {
        name,
        language: fileName2Language(name),
        value: "",
      };
      return { files: newFiles };
    }),

  removeFile: (name: string) =>
    set((state) => {
      const newFiles = { ...state.files };
      delete newFiles[name];
      return { files: newFiles };
    }),

  updateFileName: (oldFieldName: string, newFieldName: string) =>
    set((state) => {
      if (
        !state.files[oldFieldName] ||
        newFieldName === undefined ||
        newFieldName === null
      )
        return state;

      const { [oldFieldName]: value, ...rest } = state.files;
      const newFiles = {
        ...rest,
        [newFieldName]: {
          ...value,
          language: fileName2Language(newFieldName),
          name: newFieldName,
        },
      };
      return { files: newFiles };
    }),
}));

// effect to update the url hash
if (typeof window !== "undefined") {
  usePlaygroundStore.subscribe((state) => {
    const hash = compress(JSON.stringify(state.files));
    window.location.hash = hash;
  });
}
