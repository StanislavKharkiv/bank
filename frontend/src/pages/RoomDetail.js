import { Container } from "@mui/material";
import { Header } from "../components/Header";
import { RoomDetail as RoomDetailTable} from "../components/RoomDetail/RoomDetail";

export default function RoomDetail() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <RoomDetailTable />
      </Container>
    </>
  );
}
