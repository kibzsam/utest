import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import { add, sub } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePicker({date, setDate}) {
  const classes = useStyles();

  const onLeft = () => {
    setDate(new Date(sub(date, {
      days: 1
    })));
  }

  const onRight = () => {
    setDate(new Date(add(date, {
      days: 1
    })));
  }

  const onDouble = () => {

  }

  const onSelect = (e) => {
    setDate(new Date(e.target.value));
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        type="date"
        value={date.toISOString().substring(0,10)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onSelect}
      />
      <Box component="span" minWidth={30}/>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={onLeft}><Icon>arrow_left</Icon></Button>
          <Button onClick={onRight}><Icon>arrow_right</Icon></Button>
          <Button onClick={onDouble}><Icon>double_arrow</Icon></Button>
        </ButtonGroup>
    </form>
  );
}