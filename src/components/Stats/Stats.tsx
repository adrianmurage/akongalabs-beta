import { Flex, Text, Card } from "@radix-ui/themes";
import styles from "../../App.module.css";

const Stats = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="3"
      className={styles.container}
    >
      <Text size="6" weight="bold">📊 Stats Page</Text>
      <Card style={{ padding: "20px", maxWidth: "400px" }}>
        <Flex direction="column" gap="2">
          <Text>This is a test stats page to verify routing works correctly!</Text>
          <Text size="2" color="gray">
            You are at: <strong>/app/stats</strong>
          </Text>
          <Text size="2" color="gray">
            URL should show: <strong>http://0.0.0.0:3001/app/stats</strong>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Stats;