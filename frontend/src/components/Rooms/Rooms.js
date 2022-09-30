import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../api";
import styles from "./Rooms.module.css";
import { routes } from "../../routes";

export function Rooms() {
  const navigate = useNavigate();
  const [roomsData, setRoomsData] = useState();

  useEffect(() => {
    fetch(api.rooms)
      .then((resp) => resp.json())
      .then((data) => {
        setRoomsData(Object.values(data));
      });
  }, []);

  const totalWorth = useMemo(() => {
    return roomsData?.reduce((total, current) => total + current.price, 0);
  }, [roomsData]);

  const handleRowClick = (id) => {
    navigate(routes.room(id))
    console.log(routes.room(id))
  };
  console.log(roomsData);
  return (
    <>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Room</TableCell>
            <TableCell align="right">Total Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomsData?.map((row) => (
            <TableRow
              key={row.room + row.Product}
              className={styles.row}
              onClick={() => handleRowClick(row.room)}
            >
              <TableCell component="th" scope="row">
                {row.room}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="subtitle2" className={styles.total}>
        Total Worth: {totalWorth}
      </Typography>
    </>
  );
}
