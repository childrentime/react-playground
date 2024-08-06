import { IMPORT_MAP_FILE_NAME } from "../files";
import { usePlaygroundStore } from "../store";

export function useAutoMap() {
  const { files, setFiles } = usePlaygroundStore();
  const importMap = files[IMPORT_MAP_FILE_NAME].value;

  return (module: string) => {
    try {
      const imports = JSON.parse(importMap).imports;
      let hasChanged = false;

      if (!imports[module]) {
        hasChanged = true;
        imports[module] = `https://esm.sh/${module}`;
      }

      if (!hasChanged) {
        return;
      }

      setFiles({
        ...files,
        [IMPORT_MAP_FILE_NAME]: {
          ...files[IMPORT_MAP_FILE_NAME],
          value: JSON.stringify({ imports }, null, 2),
        },
      });
    } catch (error) {}
  };
}
