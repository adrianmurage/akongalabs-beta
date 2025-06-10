import { Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import styles from "./App.module.css";
import ThemeChanger from "./components/theme-changer/ThemeChanger";
import api from "./lib/api";

function App() {
  const currentPath = window.location.pathname;
  
  // Route to different components based on path
  if (currentPath.startsWith('/app')) {
    return <ReactApp />;
  }
  
  // Default to landing page for root route
  return <LandingPage />;
}

function ReactApp() {
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
      <Text>You're in the React App (/app/*)</Text>
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

function LandingPage() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="3"
      className={styles.container}
    >
      <Text size="8">🐼 Welcome to Working Panda</Text>
      <Text>This is the landing page served at the root route.</Text>
      <Text>
        <a href="/app" style={{ color: '#007bff', textDecoration: 'none' }}>
          Go to the React App
        </a>
      </Text>
      <Text>
        <a href="/api/health" style={{ color: '#007bff', textDecoration: 'none' }}>
          Check API Health
        </a>
      </Text>
    </Flex>
  );
}

export default App;
