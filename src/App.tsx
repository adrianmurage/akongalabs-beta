import { Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "./App.module.css";
import ThemeChanger from "./components/theme-changer/ThemeChanger";

function App() {
  const { data: backendData, isLoading: loading, error } = useQuery({
    queryKey: ['backend-data'],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/");
      return response.data;
    },
  });

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="3"
      className={styles.container}
    >
      <Text>Hello from Radix Themes :)</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text color="red">Failed to fetch data from backend</Text>
      ) : (
        <Text>{backendData}</Text>
      )}
      <ThemeChanger />
    </Flex>
  );
}

export default App;
