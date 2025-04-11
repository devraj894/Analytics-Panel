import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart({ userPercentile }) {
  const xAxisValues = [0, 25, 50, 75, 100];
  const chartWidth = 500; 
  const chartHeight = 300;
  const chartPaddingLeft = 50;
  const chartPaddingRight = 20;

  const clampedPercentile = Math.max(0, Math.min(userPercentile, 100));
  const linePosition =
    ((clampedPercentile / 100) * (chartWidth - chartPaddingLeft - chartPaddingRight)) +
    chartPaddingLeft;

  return (
    <div className="p-5 sm:p-7 bg-white rounded-xl border border-gray-200 relative text-sm space-y-3 w-full overflow-x-auto">
      <h2 className="font-semibold">Comparison Graph</h2>

      <p className="text-gray-600 mb-4 max-w-md">
        <span className="font-bold text-gray-600">You scored {clampedPercentile}</span>, which is slower than average percentile 72% of all the engineers who took this assessment.
      </p>

      <div className="relative w-[500px] max-w-full">
        {/* Red Label Above Line */}
        <div
          style={{
            position: 'absolute',
            top: '95px',
            left: `${linePosition}px`,
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded shadow font-semibold whitespace-nowrap">
            Your Percentile
          </div>
        </div>

        {/* Red Vertical Line */}
        <div
          style={{
            position: 'absolute',
            top: '125px',
            left: `${linePosition}px`,
            width: '2px',
            height: '160px',
            backgroundColor: 'red',
            zIndex: 5,
          }}
        />

        {/* Line Chart */}
        <LineChart
          xAxis={[
            {
              data: xAxisValues,
              scaleType: 'linear',
              min: 0,
              max: 100,
              valueFormatter: (val) => `${val}%`,
            },
          ]}
          yAxis={[{ hide: true }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5],
              showMark: false,
              curve: 'natural',
              color: '#1976d2',
            },
          ]}
          width={chartWidth}
          height={chartHeight}
          grid={{ vertical: false, horizontal: false }}
        />
      </div>
    </div>
  );
}
