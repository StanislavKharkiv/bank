import { Container } from "@mui/material";
import { Header } from "../components/Header";
import { Rooms as RoomsTable } from "../components/Rooms";

export default function Rooms({ user, setUser }) {
  return (
    <>
      <Header user={user} setUser={setUser} />
      <Container maxWidth="sm">
        <RoomsTable />
      </Container>
    </>
  );
}
