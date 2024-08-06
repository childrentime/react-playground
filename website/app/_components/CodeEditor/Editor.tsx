import MonacoEditor, {
  EditorProps,
  Monaco,
  OnMount,
} from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { darkTheme, lightTheme } from "./theme";
import { createATA } from "./ata";
import { editor } from "monaco-editor";
import { useTheme } from "../Header/context";
import { useAutoMap } from "./auto-map";
import { toast } from "sonner";
import { useClipboard } from "@reactuses/core";

const light = "light";
const dark = "dark";

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

export interface MyEditorProps {
  file: EditorFile;
  onChange?: EditorProps["onChange"];
  options?: editor.IStandaloneEditorConstructionOptions;
}

export function Editor(props: MyEditorProps) {
  const { file, onChange, options } = props;
  const { theme } = useTheme();
  const themeString = theme ? dark : light;
  const ataRef = useRef<ReturnType<typeof createATA> | null>(null);
  const autoMap = useAutoMap();
  const [_, copy] = useClipboard();

  const handleEditorMount: OnMount = (editor, monaco) => {
    setMonacoInstance(monaco);
    // Set compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
      allowJs: true,
      checkJs: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      module: monaco.languages.typescript.ModuleKind.ESNext,
    });
    // Set Ata
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });
    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });
    ata(editor.getValue());
    ataRef.current = ata;
    // KeyMod
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      copy(window.location.href);
      toast.success("share link copied");
    });
    // map tips
    let decorations: string[] = [];
    let hoverDecorationLineNumber: number | null = null;
    const validImportRegex =
      /import\s+(?:(?:\w+(?:\s*,\s*\{\s*[^}]*\s*\})?|\{\s*[^}]*\s*\}|\*\s+as\s+\w+)\s+from\s+)?['"]([^'".][^'"]+)['"]/;
    const text = "Add to import map";
    editor.onMouseMove((e: editor.IEditorMouseEvent) => {
      const position = e.target.position;
      if (position) {
        const lineContent = editor
          .getModel()
          ?.getLineContent(position.lineNumber);
        if (lineContent) {
          const importMatch = lineContent.match(validImportRegex);
          if (importMatch) {
            hoverDecorationLineNumber = position.lineNumber;
            decorations = editor.deltaDecorations(decorations, [
              {
                range: new monaco.Range(
                  position.lineNumber,
                  1,
                  position.lineNumber,
                  lineContent.length
                ),
                options: {
                  isWholeLine: true,
                  linesDecorationsClassName: "addToImportMap",
                  hoverMessage: { value: text },
                },
              },
            ]);
          } else {
            // 如果不是 import 语句，清除装饰
            decorations = editor.deltaDecorations(decorations, []);
            hoverDecorationLineNumber = null;
          }
        }
      }
    });
    editor.onMouseDown((e: editor.IEditorMouseEvent) => {
      if (
        e.target.type === monaco.editor.MouseTargetType.CONTENT_WIDGET &&
        e.target.element?.innerText === text &&
        hoverDecorationLineNumber !== null
      ) {
        const lineContent = editor
          .getModel()
          ?.getLineContent(hoverDecorationLineNumber);
        if (lineContent) {
          const importMatch = lineContent.match(validImportRegex);
          if (importMatch) {
            const moduleName = importMatch[1];
            autoMap(moduleName);
            toast.success(`Added ${moduleName} to import map`);
          }
        }
      }
    });
  };

  useEffect(() => {
    if (ataRef.current) {
      ataRef.current(file.value);
    }
  }, [file.value]);

  const [monacoInstance, setMonacoInstance] = useState<Monaco | null>(null);

  // Set theme
  useEffect(() => {
    if (monacoInstance) {
      monacoInstance.editor.defineTheme(light, lightTheme);
      monacoInstance.editor.defineTheme(dark, darkTheme);
      monacoInstance.editor.setTheme(themeString);
    }
  }, [monacoInstance, themeString]);

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      onChange={onChange}
      onMount={handleEditorMount}
      value={file.value}
      theme={themeString}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        glyphMargin: true,
        ...options,
      }}
    />
  );
}
