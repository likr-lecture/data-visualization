import React from "react";
import * as d3 from "d3";

const Chart = ({ data }) => {
  const width = 600;
  const height = 600;
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        <g>
          {data.links.map((link, i) => (
            <line
              key={i}
              x1={link.source.x}
              y1={link.source.y}
              x2={link.target.x}
              y2={link.target.y}
              stroke="#999"
              strokeOpacity="0.6"
              strokeWidth={Math.sqrt(link.value)}
            />
          ))}
        </g>
        <g>
          {data.nodes.map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r="5"
              fill={color(node.group)}
              stroke="#fff"
              strokeWidth="1.5"
            />
          ))}
        </g>
        <g>
          {data.nodes.map((node, i) => (
            <text
              key={i}
              x={node.x}
              y={node.y}
              fontSize="8"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {node.name}
            </text>
          ))}
        </g>
      </g>
    </svg>
  );
};

export class NodeLinkDiagramPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch("/data/miserables.json")
      .then((response) => response.json())
      .then((data) => {
        d3.forceSimulation(data.nodes)
          .force("charge", d3.forceManyBody())
          .force("link", d3.forceLink(data.links))
          .force("center", d3.forceCenter())
          .on("end", () => {
            this.setState({ data });
          });
      });
  }

  render() {
    const { data } = this.state;
    if (data == null) {
      return "loading";
    }
    return <Chart data={data} />;
  }
}
