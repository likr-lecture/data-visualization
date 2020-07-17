import React from "react";
import * as d3 from "d3";

const Radviz = ({ data, dimensions }) => {
  const r = 300;
  const contentWidth = 2 * r;
  const contentHeight = 2 * r;
  const margin = 50;
  const width = contentWidth + margin * 2;
  const height = contentHeight + margin * 2;

  const n = dimensions.length;

  const scales = dimensions.map((property) => {
    return d3
      .scaleLinear()
      .domain(d3.extent(data, (item) => item[property]))
      .range([0, 1]);
  });
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  for (const item of data) {
    color(item.species);
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${margin + r},${margin + r})`}>
        <circle r={r} fill="none" stroke="black" />
        {dimensions.map((property, i) => {
          return (
            <g key={i} transform={`rotate(${(360 / n) * i + 90})`}>
              <line x1="0" y1="0" x2="0" y2={-r} stroke="black" />
              <text
                y={-r}
                textAnchor="middle"
                dominantBaseline="text-after-edge"
              >
                {property}
              </text>
            </g>
          );
        })}
        {data.map((item, i) => {
          let a = 0;
          let b = 0;
          let c = 0;
          const dt = (2 * Math.PI) / n;
          for (let j = 0; j < n; ++j) {
            const v = scales[j](item[dimensions[j]]);
            a += v * Math.cos(dt * j);
            b += v * Math.sin(dt * j);
            c += v;
          }
          a *= r / c;
          b *= r / c;
          const d = Math.sqrt(a * a + b * b);
          const t = Math.atan2(b, a);
          const x = d * Math.cos(t);
          const y = d * Math.sin(t);
          return (
            <g key={i} transform={`translate(${x},${y})`}>
              <circle r="3" fill={color(item.species)} opacity="0.8">
                <title>{dimensions.map((p) => item[p]).join(",")}</title>
              </circle>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export const RadvizPage = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("/data/iris.json")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item, i) => {
          item.id = i;
        });
        setData(data);
      });
  }, []);

  return (
    <div>
      <figure className="image is-1by1">
        <Radviz
          data={data}
          dimensions={[
            "sepalLength",
            "sepalWidth",
            "petalLength",
            "petalWidth",
          ]}
        />
      </figure>
    </div>
  );
};
