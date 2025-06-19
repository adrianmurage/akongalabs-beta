import { Select } from "@base-ui-components/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeSelect.module.css";

export const ThemeSelect = () => {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return placeholder with same dimensions to avoid layout shift
    return (
      <div className={styles.placeholder}>
        <span>Theme</span>
      </div>
    );
  }

  const handleThemeChange = (value: string | null) => {
    if (value) {
      setTheme(value);
    }
  };

  return (
    <Select.Root value={theme || "system"} onValueChange={handleThemeChange}>
      <Select.Trigger className={styles.trigger}>
        <Select.Value placeholder="Select theme">
          {(_, value) => (
            <span className={styles.value}>
              <span className={styles.icon} aria-hidden="true">
                {value === "system" && "💻"}
                {value === "light" && "☀️"}
                {value === "dark" && "🌙"}
              </span>
              <span className={styles.label}>
                {value === "system"
                  ? `System (${resolvedTheme || systemTheme || "light"})`
                  : value || "light"}
              </span>
            </span>
          )}
        </Select.Value>
        <Select.Icon className={styles.arrow}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner className={styles.positioner}>
          <Select.Popup className={styles.popup}>
            <Select.Item value="system" className={styles.option}>
              <Select.ItemText>
                <span className={styles.optionContent}>
                  <span className={styles.icon}>💻</span>
                  <span>System</span>
                </span>
              </Select.ItemText>
              <Select.ItemIndicator className={styles.indicator}>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1 5L4.5 8.5L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Select.ItemIndicator>
            </Select.Item>

            <Select.Item value="light" className={styles.option}>
              <Select.ItemText>
                <span className={styles.optionContent}>
                  <span className={styles.icon}>☀️</span>
                  <span>Light</span>
                </span>
              </Select.ItemText>
              <Select.ItemIndicator className={styles.indicator}>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1 5L4.5 8.5L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Select.ItemIndicator>
            </Select.Item>

            <Select.Item value="dark" className={styles.option}>
              <Select.ItemText>
                <span className={styles.optionContent}>
                  <span className={styles.icon}>🌙</span>
                  <span>Dark</span>
                </span>
              </Select.ItemText>
              <Select.ItemIndicator className={styles.indicator}>
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1 5L4.5 8.5L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
};
