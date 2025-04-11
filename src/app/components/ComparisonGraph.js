import React, { useRef, useEffect, useState } from 'react';
import {
  ResponsiveChartContainer,
  LinePlot,
  ChartsXAxis,
  ChartsYAxis,
} from '@mui/x-charts';

export default function BasicLineChart({ userPercentile }) {
  const chartContainerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const clampedPercentile = Math.max(0, Math.min(userPercentile, 100));
  const chartPaddingLeft = 50;
  const chartPaddingRight = 20;

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        setContainerWidth(chartContainerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const linePosition =
    ((clampedPercentile / 100) * (containerWidth - chartPaddingLeft - chartPaddingRight)) +
    chartPaddingLeft;

  return (
    <div className="p-5 sm:p-7 bg-white rounded-xl border border-gray-200 relative text-sm space-y-3 w-full">
      <h2 className="font-semibold">Comparison Graph</h2>

      <p className="text-gray-600 mb-4 max-w-md">
        <span className="font-bold text-gray-600">You scored {clampedPercentile}</span>, which is slower than average percentile 72% of all the engineers who took this assessment.
      </p>

      <div ref={chartContainerRef} className="relative w-full min-h-[300px]">
        {/* Red Label */}
        {containerWidth > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '85px',
              left: `${linePosition}px`,
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
          >
            <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded shadow font-semibold whitespace-nowrap">
              Your Percentile
            </div>
          </div>
        )}

        {/* Red Vertical Line */}
        {containerWidth > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '115px',
              left: `${linePosition}px`,
              width: '2px',
              height: '160px',
              backgroundColor: 'red',
              zIndex: 5,
            }}
          />
        )}

        {/* Line Chart */}
        <ResponsiveChartContainer
          height={300}
          margin={{
            left: chartPaddingLeft,
            right: chartPaddingRight,
            top: 30,
            bottom: 30,
          }}
          xAxis={[
            {
              data: [0, 25, 50, 75, 100],
              scaleType: 'linear',
              valueFormatter: (val) => `${val}%`,
            },
          ]}
          yAxis={[
            {
              min: 0,
              max: 10,
              tickNumber: 5,
              valueFormatter: (val) => val.toFixed(1),
            },
          ]}
          series={[
            {
              type: 'line',
              data: [2, 5.5, 2, 8.5, 1.5],
              showMark: false,
              curve: 'natural',
              color: '#1976d2',
            },
          ]}
        >
          <LinePlot />
          <ChartsXAxis />
          <ChartsYAxis />
        </ResponsiveChartContainer>
      </div>
    </div>
  );
}
