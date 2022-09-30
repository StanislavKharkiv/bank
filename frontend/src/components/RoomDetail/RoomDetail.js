import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../api";
import styles from "./RoomDetail.module.css";

export function RoomDetail() {
  const { id } = useParams();
  const [roomData, setRoomData] = useState();
  const roomId = id.slice(1);

  useEffect(() => {
    fetch(api.room(roomId))
      .then((resp) => resp.json())
      .then((data) => setRoomData(Object.values(data)));
  }, [roomId]);

  const totalWorth = useMemo(() => {
    return roomData?.reduce(
      (total, current) => total + current.price * current.qty,
      0
    );
  }, [roomData]);

  console.log(roomData);
  return (
    <>
      <h2>room id</h2>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomData?.map((row) => (
            <TableRow key={row.room + row.Product} className={styles.row}>
              <TableCell component="th" scope="row">
                {row.Product}
              </TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.qty}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="right">{row.price * row.qty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={styles.total}>Total Worth: {totalWorth?.toFixed(4)}</div>
    </>
  );
}
