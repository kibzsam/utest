import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    padding: 5
  },
});

export default function BasicTable({ title, date, value, border, oneClick, doubleClick, fontWeight }) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" flex={1} borderRight={border ? "1px solid grey" : null} onClick={oneClick} onDoubleClick={doubleClick}>
      <Typography variant="h5" align="center" className={classes.title}>{title}</Typography>
      <Divider></Divider>
      <Box display="flex" flexDirection="column" alignItems='center' pt={1} pb={1}>
        <Typography variant="subtitle2" align="center">{date}</Typography>
        <Box component="span" minHeight={5}></Box>
        <Typography variant="subtitle2" align="center" style={{ fontWeight: fontWeight }} >{value}</Typography>
      </Box>
    </Box>
  );
}
