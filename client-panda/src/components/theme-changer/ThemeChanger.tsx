import { Button } from "@components/Button";
import { useTheme } from "next-themes";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <Button onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
    </div>
  );
};

export default ThemeChanger;
