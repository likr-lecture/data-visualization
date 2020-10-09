import React from "react";
import * as d3 from "d3";

const ParallelCoordinates = ({
  data,
  variables,
  margin,
  contentWidth,
  contentHeight,
}) => {
  const width = contentWidth + margin.left + margin.right;
  const height = contentHeight + margin.top + margin.bottom;
  const strokeColor = "#888";

  const xScale = d3
    .scaleLinear()
    .domain([0, variables.length - 1])
    .range([0, contentWidth]);
  const yScales = variables.map(({ property }) => {
    return d3
      .scaleLinear()
      .domain(d3.extent(data, (item) => item[property]))
      .range([contentHeight, 0])
      .nice();
  });
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  for (const item of data) {
    color(item.species);
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <g>
          {data.map((item, i) => {
            const line = d3
              .line()
              .x((_, i) => xScale(i))
              .y(({ property }, i) => yScales[i](item[property]));
            return (
              <g key={i}>
                <path
                  d={line(variables)}
                  stroke={color(item.species)}
                  fill="none"
                />
              </g>
            );
          })}
        </g>
        <g>
          {variables.map(({ label, property }, i) => {
            const yScale = yScales[i];
            return (
              <g key={i} transform={`translate(${xScale(i)},0)`}>
                <line y1="0" y2={contentHeight} stroke={strokeColor} />
                <g>
                  {yScale.ticks().map((y, j) => {
                    return (
                      <g key={j} transform={`translate(0,${yScale(y)})`}>
                        <line x1="-3" x2="3" stroke={strokeColor} />
                        <text x="5" fontSize="8" dominantBaseline="central">
                          {y}
                        </text>
                      </g>
                    );
                  })}
                </g>
                <text
                  y="-5"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="text-after-edge"
                >
                  {label}
                </text>
                <text
                  y={contentHeight + 5}
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="text-before-edge"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>
        <g transform={`translate(${contentWidth + 30},0)`}>
          {color.domain().map((species, i) => {
            return (
              <g
                key={i}
                transform={`translate(0,${i * 30})`}
                style={{ cursor: "pointer" }}
              >
                <rect width="10" height="10" fill={color(species)} />
                <text x="15" y="10" fontSize="12">
                  {species}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
};

export const ParallelCoordinatesPage = () => {
  const variables = [
    { label: "Sepal Length", property: "sepalLength" },
    { label: "Sepal Width", property: "sepalWidth" },
    { label: "Petal Length", property: "petalLength" },
    { label: "Petal Width", property: "petalWidth" },
  ];
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
      <h1 className="title is-3">
        Parallel Coordinates Plot of Iris Flower Dataset
      </h1>
      <figure className="image is-1by1">
        <ParallelCoordinates
          data={data}
          variables={variables}
          margin={{
            top: 30,
            left: 40,
            bottom: 30,
            right: 120,
          }}
          contentWidth={600}
          contentHeight={400}
        />
      </figure>
    </div>
  );
};
