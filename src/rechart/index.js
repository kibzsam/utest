import React, { useCallback } from 'react';
import EChart from 'react-apexcharts'

const options = {
  chart: {
    type: 'candlestick',
    height: 350
  },
  title: {
    text: 'CandleStick Chart',
    align: 'left'
  },
  xaxis: {
    type: 'datetime',
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#00B746',
        downward: '#EF403C'
      },
      wick: {
        useFillColor: true
      }
    }
  },
  selection: {
    enabled: true,
    type: 'x',
    fill: {
      color: '#24292e',
      opacity: 0.1
    },
    stroke: {
      width: 1,
      dashArray: 3,
      color: '#24292e',
      opacity: 0.4
    },
    xaxis: {
      min: undefined,
      max: undefined
    },
    yaxis: {
      min: undefined,
      max: undefined
    }
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
}

export default function Chart({data}) {
  const series = useCallback(() => {
    return [
      {
        data: data
      }
    ]
  }, [JSON.stringify(data)])();

  return (
    <div id="chart">
      <EChart options={options} series={series} type="candlestick" height={350} />
    </div>
  )
}