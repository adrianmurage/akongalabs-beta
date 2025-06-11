import { Flex, Text, Button } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import styles from "./App.module.css";
import ThemeChanger from "./components/theme-changer/ThemeChanger";
import api from "./lib/api";

function App() {
  const {
    data: backendData,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["backend-data"],
    queryFn: async () => {
      const response = await api.get("/hello");
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
      <Text>Hello from Working Panda 🐼 :)</Text>
      <Text>You're in the React App!</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text color="red">Failed to fetch data from backend</Text>
      ) : (
        <Text>{backendData}</Text>
      )}
      
      <Flex gap="2">
        <Button asChild>
          <Link to="/stats">Go to Stats</Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="/">Back to Home</a>
        </Button>
      </Flex>
      
      <ThemeChanger />
    </Flex>
  );
}

export default App;
