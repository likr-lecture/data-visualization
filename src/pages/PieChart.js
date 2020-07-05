import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
  const pie = d3.pie().value((d) => d.value);
  const arcs = pie(data);
  const arc = d3.arc().innerRadius(0).outerRadius(200);
  const arcLabel = d3.arc().innerRadius(240).outerRadius(240);
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  return (
    <svg viewBox="0 0 600 600">
      <g transform="translate(300,300)">
        {arcs.map((d) => {
          const path = arc(d);
          const [cx, cy] = arcLabel.centroid(d);
          return (
            <g key={d.data.label}>
              <line x1="0" y1="0" x2={cx} y2={cy} stroke="#ccc" />
              <path d={path} fill={color(d.data.label)} stroke="white">
                <title>{d.data.label}</title>
              </path>
              <text
                x={cx}
                y={cy}
                fontSize="10"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {d.data.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export const PieChartPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await fetch("/data/consumption.json");
      const data = await response.json();
      setData(data);
    })();
  }, []);
  return (
    <div>
      <h1 className="title">2019年消費支出内訳</h1>
      <figure className="image is-1by1">
        {data && <PieChart data={data} />}
      </figure>
      <p className="mt-4">
        <a
          href="https://www.e-stat.go.jp/stat-search/files?page=1&layout=datalist&toukei=00200561&tstat=000000330001&cycle=7&year=20190&month=0&tclass1=000000330007&tclass2=000000330008&tclass3=000000330009&stat_infid=000031946721&result_back=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          2019年家計調査
        </a>
        より
      </p>
    </div>
  );
};
