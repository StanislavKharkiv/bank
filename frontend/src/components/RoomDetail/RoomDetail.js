import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../api";
import { routes } from "../../routes";
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

  return (
    <>
      <div className={styles.header}>
        <Link className={styles.back} to={routes.rooms}>
          <span className={styles.arrow}>&#x2196;</span>
          <span>back</span>
        </Link>
        <Typography variant="h6" component="h2">
          Room: {roomId}
        </Typography>
      </div>
      <hr />
      <div className={styles.table_wrapper}>
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
      </div>
      <div className={styles.total}>
        <div className={styles.total__worth}>
          Total Worth:
          <span className={styles.total__price}>{totalWorth?.toFixed(4)}</span>
        </div>
        {roomData?.map(({ type, qty, price }) => (
          <div key={type + price}>
            {type}:
            <span className={styles.total__price}>
              {(qty * price).toFixed(4)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
