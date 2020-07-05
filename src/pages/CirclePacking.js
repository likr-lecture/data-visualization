import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const CirclePacking = ({ data }) => {
  const width = 800;
  const height = 800;
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const stratify = d3
    .stratify()
    .id((d) => d.name)
    .parentId((d) => d.parent);
  const root = stratify(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);
  root.color = "none";
  for (const u of root.children) {
    u.color = "none";
    for (const v of u.children) {
      v.color = color(v.id);
      v.each((w) => {
        w.color = v.color;
      });
    }
  }
  const pack = d3.pack().size([width, height]);
  pack(root);
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <g>
        {root.descendants().map((node, i) => {
          return (
            <g key={node.id} transform={`translate(${node.x},${node.y})`}>
              <circle
                r={node.r}
                fill={node.children ? "none" : node.color}
                opacity="0.7"
                stroke="#888"
              >
                <title>
                  {node.id} ({node.value})
                </title>
              </circle>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export const CirclePackingPage = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await fetch("/data/industry.json");
      const data = await response.json();
      setData(data);
    })();
  }, []);

  return (
    <div>
      <h1 className="title is-3">2019年産業別就業者数</h1>
      <figure className="image is-4by3">
        {data && <CirclePacking data={data} />}
      </figure>
      <p className="mt-4">
        <a
          href="https://www.e-stat.go.jp/stat-search/files?page=1&layout=datalist&toukei=00200531&tstat=000000110001&cycle=7&year=20190&month=0&tclass1=000001040276&tclass2=000001040283&tclass3=000001040284&result_back=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          2019年労働力調査
        </a>
        より
      </p>
    </div>
  );
};
