import Chart from 'react-apexcharts';

const series = [
  {
    name: 'Candles',
    data: Array(400).fill(0).map((_, index) => ({
      x: new Date(`2022-01-01T00:00:00.000Z`).getTime() + index * 24 * 60 * 60 * 1000,
      y: [
        Math.random() * 100 + 50,
        Math.random() * 100 + 50,
        Math.random() * 100 + 50,
        Math.random() * 100 + 50,
      ],
      markers: {
        size: 4,
        colors: ['#7b22a1', '#E91E63', '#9C27B0']
      }
    })),
  },
];

const options = {
  chart: {
    type: 'candlestick',
    height: 400,
    background: '#1E1E1E',
  },
  title: {
    text: 'Candlestick Chart',
    style: {
      color: '#FFFFFF',
    }
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#34C759', // green
        downward: '#F43F5E', // red
      },
      wick: {
        color: '#7b22a1',
        useFillColor: true
      },
    },
  },
};

export const ChartCandles = () => {
  return (
    <div className="rounded-xl overflow-hidden">
      <Chart options={options} series={series} type="candlestick" height={400} />
    </div>
  );
};