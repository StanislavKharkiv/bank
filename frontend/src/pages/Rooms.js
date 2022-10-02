import { Container } from "@mui/material";
import { Header } from "../components/Header";
import { Rooms as RoomsTable } from "../components/Rooms";

export default function Rooms() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <RoomsTable />
      </Container>
    </>
  );
}
