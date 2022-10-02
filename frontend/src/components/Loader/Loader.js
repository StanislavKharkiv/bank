import { Container, LinearProgress } from "@mui/material";
import styles from "./Loader.module.css";

export function Loader({error}) {
  return (
    <Container  maxWidth="md">
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Super Bank</h1>
      <LinearProgress sx={{ width: "100%" }} />
      {error && <p className={styles.error}>something went wrong</p>}
    </div>
    </Container>
  );
}
