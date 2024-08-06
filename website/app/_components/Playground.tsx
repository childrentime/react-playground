"use client";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { CodeEditor } from "./CodeEditor";
import { Header } from "./Header";
import { Preview } from "./Previewer";
import { usePlaygroundStore } from "./store";

export function ReactPlayground() {
  const { previewKey } = usePlaygroundStore();
  return (
    <div style={{ height: `calc(100vh - 50px)` }}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={0}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
            <Preview key={previewKey}/>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
