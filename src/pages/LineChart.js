import React from "react";
import * as d3 from "d3";

const LineChart = ({ data, margin, contentWidth, contentHeight }) => {
  const width = contentWidth + margin * 2;
  const height = contentHeight + margin * 2;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (item) => item.month))
    .range([0, contentWidth]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (item) => item.temperature)])
    .range([contentHeight, 0])
    .nice();

  const line = d3
    .line()
    .x((item) => xScale(item.month))
    .y((item) => yScale(item.temperature));

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin},${margin})`}>
        <line x0="0" y0="0" x1="0" y1={contentHeight} stroke="black" />
        {yScale.ticks(5).map((y, i) => {
          return (
            <g key={i} transform={`translate(0,${yScale(y)})`}>
              <line x0="0" y0="0" x1="-5" y1="0" stroke="black" />
              <text x="-8" y="5" textAnchor="end">
                {y}
              </text>
            </g>
          );
        })}
      </g>
      <g transform={`translate(${margin},${margin + contentHeight})`}>
        <line x0="0" y0="0" x1={contentWidth} y1="0" stroke="black" />
        {xScale.ticks(12).map((month, i) => {
          return (
            <g key={i} transform={`translate(${xScale(month)},0)`}>
              <line x0="0" y0="0" x1="0" y1="5" stroke="black" />
              <text y="20" textAnchor="middle">
                {month}
              </text>
            </g>
          );
        })}
      </g>
      <g transform={`translate(${margin},${margin})`}>
        <path fill="none" stroke="black" d={line(data)} />
      </g>
    </svg>
  );
};

export const LineChartPage = () => {
  const data = [
    { month: 1, temperature: 4.7 },
    { month: 2, temperature: 5.4 },
    { month: 3, temperature: 11.5 },
    { month: 4, temperature: 17.0 },
    { month: 5, temperature: 19.8 },
    { month: 6, temperature: 22.4 },
    { month: 7, temperature: 28.3 },
    { month: 8, temperature: 28.1 },
    { month: 9, temperature: 22.9 },
    { month: 10, temperature: 19.1 },
    { month: 11, temperature: 14.0 },
    { month: 12, temperature: 8.3 },
  ];

  return (
    <div>
      <h1>日平均気温の月平均値（東京2018年）</h1>
      <div>
        <LineChart
          data={data}
          margin={50}
          contentWidth={400}
          contentHeight={400}
        />
      </div>
      <div>
        <a href="http://www.data.jma.go.jp/obd/stats/etrn/view/monthly_s3.php?%20prec_no=44&block_no=47662">
          参照データ
        </a>
      </div>
    </div>
  );
};
