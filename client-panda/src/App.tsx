import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Dialog } from "@base-ui-components/react";

import styles from "./App.module.css";
import { ThemeSelect } from "./components/ThemeSelect";
import { Button } from "./components/Button/Button";
import api from "./lib/api";

function App() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

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
    <div className={styles.container}>
      <p className={styles.heading}>Hello from Working Panda 🐼 :)</p>
      <p className={styles.text}>You're in the React App!</p>
      {loading ? (
        <p className={styles.text}>Loading...</p>
      ) : error ? (
        <p className={styles.errorText}>Failed to fetch data from backend</p>
      ) : (
        <p className={styles.text}>{backendData}</p>
      )}

      <div className={styles.buttonGroup}>
        <Button onClick={() => navigate("/stats")}>Go to Stats</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Back to Home
        </Button>
        <Button variant="soft" onClick={() => setDialogOpen(true)}>
          Open Dialog
        </Button>
      </div>

      <ThemeSelect />

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className={styles.dialogBackdrop} />
          <Dialog.Popup className={styles.dialogPopup}>
            <Dialog.Title className={styles.dialogTitle}>
              Base UI Dialog Example
            </Dialog.Title>
            <Dialog.Description className={styles.dialogDescription}>
              This is a Base UI Dialog component integrated into the app. It
              demonstrates the unstyled, accessible components from Base UI.
            </Dialog.Description>
            <div className={styles.dialogActions}>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
