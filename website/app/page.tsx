"use client";
import { Toaster } from "@/components/ui/toast";
import { ThemeProvider } from "./_components/Header/context";
import { ReactPlayground } from "./_components/Playground";
import { ClientRender } from "./_utils";

function App() {
  return (
    <ClientRender>
      <ThemeProvider>
          <ReactPlayground />
          <Toaster position="top-center" richColors />
      </ThemeProvider>
    </ClientRender>
  );
}

export default App;
