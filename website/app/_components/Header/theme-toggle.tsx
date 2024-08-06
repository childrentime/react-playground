import { useTheme } from "./context";
import { SunIcon } from "@/components/ui/Icon";
import { MoonIcon } from "@radix-ui/react-icons";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return theme ? (
    <SunIcon className="h-6 w-6 cursor-pointer" onClick={toggleTheme} />
  ) : (
    <MoonIcon className="h-6 w-6 cursor-pointer" onClick={toggleTheme} />
  );
}
