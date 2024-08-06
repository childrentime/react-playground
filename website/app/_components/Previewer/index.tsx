"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePlaygroundStore } from "../store";
import { IMPORT_MAP_FILE_NAME } from "../files";
import iframeRaw from "!!raw-loader!./iframe.html?raw";
import { useTheme } from "../Header/context";
import { Message } from "./message";
import { debounce } from "lodash-es";
import { useStateChanged } from "@/app/_utils";

interface MessageData {
  data: {
    type: string;
    message: string;
  };
}

export function Preview() {
  const { files } = usePlaygroundStore();
  const [compiledCode, setCompiledCode] = useState("");

  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(new URL("./worker.ts", import.meta.url));
    workerRef.current.onmessage = ({ data }) => {
      if (data.type === "COMPILED_CODE") {
        setCompiledCode(data.data);
      } else {
        setError(data.error?.message ?? data.error);
      }
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    debounce(() => {
      workerRef.current?.postMessage(files);
    }, 500),
    [files]
  );

  const { theme } = useTheme();
  const importMap = files[IMPORT_MAP_FILE_NAME]?.value;

  const themeChanged = useStateChanged(theme);
  const codeChanged = useStateChanged(compiledCode);
  const importMapChanged = useStateChanged(importMap);

  const [iframeContent, setIframeContent] = useState("");
  const getIframeContent = useCallback(() => {
    const content = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${importMap}</script>`
      )
      .replace(
        '<script type="module" id="appScript"></script>',
        `<script type="module" id="appScript">${compiledCode}</script>`
      );

    return content;
  }, [importMap, compiledCode]);

  useEffect(() => {
    setIframeContent(getIframeContent());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const postMessage = useCallback(
    (init = false) => {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        if (themeChanged || init) {
          iframe.contentWindow.postMessage(
            { theme, type: "UPDATE_THEME" },
            "*"
          );
        }
        if (codeChanged || init) {
          iframe.contentWindow.postMessage(
            {
              type: "UPDATE_CONTENT",
              content: compiledCode,
            },
            "*"
          );
        }
        if (importMapChanged || init) {
          setIframeContent(getIframeContent());
        }
      }
    },
    [
      codeChanged,
      compiledCode,
      getIframeContent,
      importMapChanged,
      theme,
      themeChanged,
    ]
  );

  useEffect(() => {
    setError("");
    postMessage();
  }, [postMessage]);

  const [error, setError] = useState("");

  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data;
    if (type === "ERROR") {
      setError(message);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div
      className="h-full"
      style={{
        marginTop: 1,
      }}
    >
      <iframe
        srcDoc={iframeContent}
        ref={iframeRef}
        className="w-full h-full p-0 border-none"
        onLoad={() => {
          postMessage(true);
        }}
      />
      <Message type="warn" content={error} />
    </div>
  );
}
