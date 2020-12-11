import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const RadarChart = ({ data }) => {
  const margin = {
    top: 50,
    right: 100,
    bottom: 100,
    left: 100,
  };
  const r = 300;
  const scale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data.keys, (key) => d3.max(data.values, (item) => item[key])),
    ])
    .range([0, r])
    .nice();
  const t0 = -Math.PI / 2;
  const dt = (Math.PI * 2) / data.keys.length;
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const axisColor = "#ccc";
  const path = (points) => {
    const path = d3.path();
    points.forEach(({ x, y }, j) => {
      if (j === 0) {
        path.moveTo(x, y);
      } else {
        path.lineTo(x, y);
      }
    });
    path.closePath();
    return path.toString();
  };
  return (
    <svg
      viewBox={`0 0 ${2 * r + margin.left + margin.right} ${
        2 * r + margin.top + margin.bottom
      }`}
    >
      <g transform={`translate(${r + margin.left},${r + margin.right})`}>
        <g>
          {data.keys.map((key, j) => {
            return (
              <g key={j}>
                <line
                  x1="0"
                  y1="0"
                  x2={r * Math.cos(t0 + dt * j)}
                  y2={r * Math.sin(t0 + dt * j)}
                  stroke={axisColor}
                />
                <text
                  x={(r + 20) * Math.cos(t0 + dt * j)}
                  y={(r + 20) * Math.sin(t0 + dt * j)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {key}
                </text>
              </g>
            );
          })}
        </g>
        <g>
          {scale.ticks(5).map((v, k) => {
            const points = data.keys.map((_, j) => {
              const d = scale(v);
              const x = d * Math.cos(t0 + dt * j);
              const y = d * Math.sin(t0 + dt * j);
              return { x, y };
            });
            return (
              <g key={k}>
                <path d={path(points)} fill="none" stroke={axisColor} />
                <text
                  x="3"
                  y={-scale(v)}
                  textAnchor="start"
                  dominantBaseline="central"
                  fontSize="10"
                >
                  {v.toFixed(0)}
                </text>
              </g>
            );
          })}
        </g>
        <g>
          {data.values.map((item, i) => {
            const points = data.keys.map((key, j) => {
              const d = scale(item[key]);
              const x = d * Math.cos(t0 + dt * j);
              const y = d * Math.sin(t0 + dt * j);
              return { x, y };
            });
            return (
              <g key={i}>
                <path d={path(points)} fill="none" stroke={color(i)} />
              </g>
            );
          })}
        </g>
        <g transform={`translate(${-r},${r + 50})`}>
          {data.values.map((item, i) => {
            return (
              <g key={i} transform={`translate(${100 * i},0)`}>
                <rect x="-5" y="-5" width="10" height="10" fill={color(i)} />
                <text
                  textAnchor="start"
                  dominantBaseline="central"
                  x="12"
                  y="0"
                  fontSize="10"
                >
                  {item["氏名"]}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
};

export const RadarChartPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await fetch("/data/score.json");
      const data = await response.json();
      setData(data);
    })();
  }, []);
  return (
    <div>
      <h1 className="title">5教科成績</h1>
      <figure className="image is-1by1">
        {data && <RadarChart data={data} />}
      </figure>
    </div>
  );
};
