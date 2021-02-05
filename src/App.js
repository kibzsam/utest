import React, { useState, useRef, useEffect } from "react"
import './App.css';
import DatePicker from './datepicker';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import Cell from './cp';
import Chart from './rechart';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import { differenceInDays, parse, differenceInHours } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  divider: {
    width: '100%',
  },
  value: {
    marginLeft: 5
  },
  file: {
    borderRadius: "15px",
    border: "3px solid grey",
    width: '10%',
    height: "70px",
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    cursor: 'pointer'
  },
  fileIcon: {
    width: "100%",
    height: '100%',
    color: "purple"
  }
}));

const status = [
  {
    title: 'C1',
    date: 'dd-mm-yyyy',
    value: 'xxx.xx.xxxx'
  },
  {
    title: 'C2',
    date: 'dd-mm-yyyy',
    value: 'xxxx.xxx.xx'
  },
  {
    title: 'C3',
    date: 'dd-mm-yyyy',
    value: 'xxxxx.xx.xx'
  },
  {
    title: 'C4',
    date: 'dd-mm-yyyy',
    value: 'xx.xx.xx'
  },
  {
    title: 'C5',
    date: 'd-mm-yyyy',
    value: 'xxx.xxx.xx'
  },
  {
    title: 'C6',
    date: 'dd-m-yyyy',
    value: 'xxx.xx.xxx'
  },
]
const regions = [
  {
    header: {
      label: 'xx'
    },
    latestData: {
      price: 1234.4,
      date: "dd-mmm-YYYY",
      is_dblclicked: 0,
    },
    history: [{
      price: 456.7,
      date: "dd-mmm-YYYY",
      is_dblclicked: 0
    }],
    config: {
      display_name: 'xxx',
      forecolor: '#ABABAB',
      backcolor: '#CECECE',
      can_dbl_click: 0,
      dblclick_fontstyle: 'font-weight:800'
    }
  },
  {
    header: {
      label: 'xx'
    },
    latestData: {
      price: 1234.4,
      date: "dd-mmm-YYYY",
      is_dblclicked: 0,
    },
    history: [{
      price: 456.7,
      date: "dd-mmm-YYYY",
      is_dblclicked: 0
    }],
    config: {
      display_name: 'xxx',
      forecolor: '#ABABAB',
      backcolor: '#CECECE',
      can_dbl_click: 0,
      dblclick_fontstyle: 'font-weight:800'
    }
  },
  {
    header: {
      label: 'xx'
    },
    latestData: {
      price: 1234.4,
      date: "dd-mmm-YYYY",
      is_dblclicked: 0,
    },
    history: [{
      price: 456.7,
      date: "dd-mmm-YYYY",
      is_dblclicked: 0
    }],
    config: {
      display_name: 'xxx',
      forecolor: '#ABABAB',
      backcolor: '#CECECE',
      can_dbl_click: 0,
      dblclick_fontstyle: 'fontWeight:800'
    }
  }
]
function App() {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [pos, setPos] = useState(0);
  const file = useRef(null);

  const handleFiles = () => {
    var reader = new FileReader();
    reader.readAsText(file.current.files[0]);
    reader.onload = (e) => {
      var allTextLines = e.target.result.split(/\r\n|\n/);
      var lines = [];
      for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        var tarr = [];
        for (var j = 0; j < data.length - 2; j++) {
          let temp = data[j];
          if (i !== 0) {
            if (j === 0) {
              temp = parse(temp, 'dd/MM/yy', new Date())
            } else {
              temp = parseFloat(temp);
            }
            tarr.push(temp);
          }
        }

        if (i !== 0) {
          lines.push({
            x: tarr[0],
            y: tarr.slice(1)
          });
        }
      }
      lines.pop();
      setData(lines);
    };

    reader.onerror = err => {
      console.err(err);
      alert(err);
    };
  };

  useEffect(() => {
    let p = data.findIndex(l => differenceInDays(l.x, date) >= 0);
    setPos(p);
    console.log(p);
    // eslint-disable-next-line
  }, [date])

  return (
    <>
      <Box m={10} mb={0} className={classes.file} onClick={() => file.current.click()}>
        <BackupOutlinedIcon className={classes.fileIcon}></BackupOutlinedIcon>
        <input type="file" hidden ref={r => file.current = r} onChange={handleFiles}></input>
      </Box>
      <Box m={10} mt={1} border="1px solid grey">
        {
          pos > -1 &&
          <Chart data={data.slice(pos)} />
        }
        <Divider />
        <Box display="flex" flexDirection="row" alignItems="center" m={3} mb={0}>
          <DatePicker date={date} setDate={setDate} />
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" m={3} mt={2} mb={1}>
          <Box component="span" minWidth={5} />
          <Typography variant="h6">{date.toISOString().substring(0, 10)}</Typography>
          <Box component="span" minWidth={70} />
          <Typography variant="subtitle1">Open:</Typography>
          <Typography variant="subtitle1" className={classes.value}>{differenceInHours(data[pos]?.x, date) > 10 ? 0 : data[pos]?.y[0]}</Typography>
          <Box component="span" minWidth={40} />
          <Typography variant="subtitle1">High: </Typography>
          <Typography variant="subtitle1" className={classes.value}>{differenceInHours(data[pos]?.x, date) > 10 ? 0 : data[pos]?.y[1]}</Typography>
          <Box component="span" minWidth={40} />
          <Typography variant="subtitle1">Low: </Typography>
          <Typography variant="subtitle1" className={classes.value}>{differenceInHours(data[pos]?.x, date) > 10 ? 0 : data[pos]?.y[2]}</Typography>
          <Box component="span" minWidth={40} />
          <Typography variant="subtitle1">Close: </Typography>
          <Typography variant="subtitle1" className={classes.value}>{differenceInHours(data[pos]?.x, date) > 10 ? 0 : data[pos]?.y[3]}</Typography>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="row" alignItems="center" m={2} mt={2} mb={1}>
          {
            regions.map((item, index) => (
              <Cell
                key={index}
                title={item.header.label}
                value={item.latestData.price}
                border={index === regions.length - 1 ? false : true}
                date={item.latestData.date}
                fontWeight={item.config.dblclick_fontstyle}
                latestData={item.latestData}
                history={item.history}
              />
            ))
          }
        </Box>
      </Box>
    </>
  );
}

export default App;
