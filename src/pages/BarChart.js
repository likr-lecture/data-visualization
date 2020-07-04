import React from "react";
import * as d3 from "d3";

const HorizontalTicks = (props) => {
  const { chartHeight, chartWidth, barWidthScale } = props;

  return (
    <g>
      <line
        x1="0"
        y1={chartHeight}
        x2={chartWidth}
        y2={chartHeight}
        stroke="#888"
      />
      {barWidthScale.ticks().map((w, i) => {
        return (
          <g key={i} transform={`translate(${barWidthScale(w)},0)`}>
            <line x1="0" y1="0" x2="0" y2={chartHeight + 5} stroke="#888" />
            <text x="0" y={chartHeight + 20} textAnchor="middle">
              {w}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const Labels = (props) => {
  const { labels, groupHeight } = props;

  return (
    <g>
      {labels.map((label, i) => {
        return (
          <g
            key={i}
            transform={`translate(0,${i * groupHeight + groupHeight / 2})`}
          >
            <line x1="-5" y1="0" x2="0" y2="0" stroke="#888" />
            <text x="-10" y="5" textAnchor="end">
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const Bars = (props) => {
  const {
    series,
    groupHeight,
    seriesMargin,
    barHeight,
    barMargin,
    barWidthScale,
    seriesColor,
  } = props;

  return (
    <g>
      {series.map((series, j) => {
        return (
          <g key={j}>
            {series.values.map((v, i) => {
              return (
                <g
                  key={i}
                  transform={`translate(0,${
                    i * groupHeight +
                    seriesMargin / 2 +
                    j * (barHeight + barMargin)
                  })`}
                >
                  <rect
                    x="0"
                    y="0"
                    width={barWidthScale(v)}
                    height={barHeight}
                    fill={seriesColor(j)}
                  />
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
};

const Legend = (props) => {
  const { x, y, series, seriesColor } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      {series.map((series, j) => {
        return (
          <g key={j} transform={`translate(0,${30 * j})`}>
            <rect width="20" height="20" fill={seriesColor(j)} />
            <text x="25" y="14">
              {series.name}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export const BarChartPage = () => {
  const data = {
    labels: ["A", "B", "C"],
    series: [
      {
        name: "data",
        values: [123, 456, 789],
      },
      {
        name: "another data",
        values: [234, 567, 891],
      },
    ],
  };

  const seriesMargin = 20;
  const barMargin = 10;
  const barHeight = 20;
  const groupHeight =
    seriesMargin +
    barHeight * data.series.length +
    barMargin * (data.series.length - 1);

  const chartWidth = 400;
  const chartHeight = groupHeight * data.labels.length;
  const leftMargin = 100;
  const rightMargin = 200;
  const topMargin = 10;
  const bottomMargin = 50;
  const svgWidth = chartWidth + leftMargin + rightMargin;
  const svgHeight = chartHeight + topMargin + bottomMargin;

  const barWidthScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.series.map((series) => d3.max(series.values)))])
    .range([0, chartWidth])
    .nice();
  const seriesColor = d3.scaleOrdinal(d3.schemeCategory10);

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${leftMargin},${topMargin})`}>
        <HorizontalTicks
          chartWidth={chartWidth}
          chartHeight={chartHeight}
          barWidthScale={barWidthScale}
        />
        <Labels labels={data.labels} groupHeight={groupHeight} />
        <Bars
          series={data.series}
          groupHeight={groupHeight}
          seriesMargin={seriesMargin}
          barHeight={barHeight}
          barMargin={barMargin}
          barWidthScale={barWidthScale}
          seriesColor={seriesColor}
        />
        <Legend
          x={chartWidth + 10}
          y={10}
          series={data.series}
          seriesColor={seriesColor}
        />
      </g>
    </svg>
  );
};
