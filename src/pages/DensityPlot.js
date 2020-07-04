import React from "react";
import * as d3 from "d3";

const Chart = ({ data }) => {
  const width = 500;
  const height = 500;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (item) => item[0]))
    .range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (item) => item[1]))
    .range([0, height]);

  const density = d3
    .contourDensity()
    .x((item) => xScale(item[0]))
    .y((item) => yScale(item[1]))
    .size([width, height]);
  const densityPath = d3.geoPath();
  const densityColor = d3
    .scaleSequential()
    .domain([0, d3.max(density(data), (d) => d.value)])
    .interpolator(d3.interpolateReds);

  return (
    <svg width={width} height={height}>
      <g>
        {density(data).map((feature, i) => {
          return (
            <g key={i}>
              <path
                d={densityPath(feature)}
                stroke="black"
                fill={densityColor(feature.value)}
              />
            </g>
          );
        })}
      </g>
      <g>
        {data.map(([x, y], i) => {
          return (
            <g key={i}>
              <circle cx={xScale(x)} cy={yScale(y)} r="3" fill="black" />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export const DensityPlotPage = () => {
  const data = [];
  for (let i = 0; i < 100; ++i) {
    const x = Math.random();
    const y = Math.random();
    data.push([x, y]);
  }
  return <Chart data={data} />;
};
