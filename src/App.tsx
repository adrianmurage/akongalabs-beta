import { Flex, Text } from "@radix-ui/themes";
import styles from "./App.module.css";
import ThemeChanger from "./components/theme-changer/ThemeChanger";

function App() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="3"
      className={styles.container}
    >
      <Text>Hello from Radix Themes :)</Text>
      <ThemeChanger />
    </Flex>
  );
}

export default App;
