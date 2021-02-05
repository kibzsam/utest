import React, { useState } from 'react';
import { useRef } from 'react';
import useDoubleClick from 'use-double-click';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
const useStyles = makeStyles({
  title: {
    padding: 5
  },
});

export default function BasicTable({ title, date, value, border, fontWeight, latestData, history }) {
  const classes = useStyles();
  const [weight, setWeight] = useState('');
  const singleClick = () => {
    if (Object.entries(latestData).length !== 0) {
      history.push(latestData);
      console.log(history);
      latestData.is_dblclicked = false
    }
  }

  const doubleClick = () => {
    if (Object.entries(latestData).length !== 0) {
      console.log(fontWeight);
      setWeight(fontWeight);
      console.log("Double click");
    }
  }
  const boxRef = useRef();
  useDoubleClick({
    onSingleClick: e => singleClick(),
    onDoubleClick: e => doubleClick(),
    ref: boxRef,
    latency: 250
  });
  return (
    <Box display="flex" flexDirection="column" flex={1} borderRight={border ? "1px solid grey" : null} ref={boxRef}>
      <Typography variant="h5" align="center" className={classes.title}>{title}</Typography>
      <Divider></Divider>
      <Box display="flex" flexDirection="column" alignItems='center' pt={1} pb={1}>
        <Typography variant="subtitle2" align="center">{date}</Typography>
        <Box component="span" minHeight={5}></Box>
        <Typography variant="subtitle2" align="center" style={{ fontWeight: 800 }} >{value}</Typography>
      </Box>
    </Box>
  );
}