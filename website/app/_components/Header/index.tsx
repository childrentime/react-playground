"use client";

import { useClipboard } from "@reactuses/core";
import { ThemeToggle } from "./theme-toggle";
import { Download, RefreshCwIcon, Share2 } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { downloadFiles } from "@/app/_utils";
import { usePlaygroundStore } from "../store";
import { GithubIcon, LogoIcon } from "@/components/ui/Icon";

export function Header() {
  const [_, copy] = useClipboard();
  const { files, refreshPreview } = usePlaygroundStore();

  return (
    <div className="h-[50px] px-5 box-border flex items-center justify-between">
      <div className="flex items-center justify-center">
        <LogoIcon className="h-8 mr-2.5" />
        <span className="text-2xl font-medium mt-2 bg-gradient-to-r from-[#1ED9F3] to-[#5825CD] bg-clip-text text-transparent">
          React Playground
        </span>
      </div>
      <div className="flex items-center">
        <RefreshCwIcon
          className="cursor-pointer mr-2"
          onClick={refreshPreview}
        />
        <ThemeToggle />
        <Share2
          className="cursor-pointer ml-2"
          onClick={() => {
            copy(window.location.href);
            toast.success("share link copied");
          }}
        />
        <Download
          className="cursor-pointer ml-2"
          onClick={async () => {
            await downloadFiles(files);
            toast.success("files downloaded");
          }}
        />
        <GithubIcon className="cursor-pointer ml-2" onClick={() => {
          window.open("https://github.com/childrentime/react-playground", "_blank");
        }}/>
      </div>
    </div>
  );
}
