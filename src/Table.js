import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function TableComp() {
  const classes = useStyles();
  const [allInfo, setAllInfo] = useState();

  const getAllInfo = async (access) => {
    try {
      //Usually insert important keys and information in enviorment variables but here for the task i wont do it
      let { data } = await axios.get(
        `http://api.scrapestack.com/scrape?access_key=${access}&url=https://www.live-rates.com/rates`
      );
      if(data.length>1) getTime(data);
    } catch (err) {
      console.log(err);
      let access='9a3bc5f8c7e2c8c7b20e20487a2a6e0b'
      getAllInfo(access)
    }
  };
  const getTime = (allInfo) => {
   for(let i = 0; i < allInfo.length; i++){
  allInfo[i]["timestamp"] = new Date(Number(allInfo[i]["timestamp"])).toLocaleString();
  }
  setAllInfo(allInfo);
}


  useEffect(() => {
    const access = 'b9efd2555ac98ebbc829aeed7daffa47'
    getAllInfo(access);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell align="right">Bid</TableCell>
            <TableCell align="right">Ask</TableCell>
            <TableCell align="right">High</TableCell>
            <TableCell align="right">Low</TableCell>
            <TableCell align="right">Open</TableCell>
            <TableCell align="right">Close</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allInfo &&
            allInfo.map((row) => (
              <TableRow key={row.currency.value}>
                <TableCell component="th" scope="row">
                  {row.currency}
                </TableCell>
                <TableCell align="right">{row.rate}</TableCell>
                <TableCell align="right">{row.bid}</TableCell>
                <TableCell align="right">{row.ask}</TableCell>
                <TableCell align="right">{row.high}</TableCell>
                <TableCell align="right">{row.low}</TableCell>
                <TableCell align="right">{row.open}</TableCell>
                <TableCell align="right">{row.close}</TableCell>
                <TableCell align="right">{row.timestamp}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default TableComp;
