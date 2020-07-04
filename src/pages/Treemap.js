import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const tileFunction = {
  binary: d3.treemapBinary,
  dice: d3.treemapDice,
  slice: d3.treemapSlice,
  sliceDice: d3.treemapSliceDice,
  squarify: d3.treemapSquarify,
  resquarify: d3.treemapResquarify,
};

const Treemap = ({ data, tile }) => {
  const width = 800;
  const height = 600;
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
  const treemap = d3
    .treemap()
    .tile(tileFunction[tile])
    .size([width, height])
    .padding(3);
  treemap(root);
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <g>
        {root.descendants().map((node, i) => {
          return (
            <g
              key={node.id}
              transform={`translate(${node.x0},${node.y0})`}
              style={{ transition: "all 0.5s ease" }}
            >
              <rect
                width={node.x1 - node.x0}
                height={node.y1 - node.y0}
                fill={node.children ? "none" : node.color}
                opacity="0.7"
                stroke="#888"
              >
                <title>
                  {node.id} ({node.value})
                </title>
              </rect>
              {!node.children && (
                <>
                  <clipPath id={`clip-${i}`}>
                    <rect width={node.x1 - node.x0} height={node.y1 - node.y0}>
                      <title>
                        {node.id} ({node.value})
                      </title>
                    </rect>
                  </clipPath>
                  <text
                    clipPath={`url(#clip-${i})`}
                    fontSize="10"
                    dominantBaseline="text-before-edge"
                  >
                    <tspan x="2" y="2">
                      {node.id}
                    </tspan>
                    <tspan x="2" y="14">
                      {node.value}
                    </tspan>
                  </text>
                </>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export const TreemapPage = () => {
  const [data, setData] = useState(null);
  const [tile, setTile] = useState("squarify");
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
      <div className="field">
        <label className="label">Tiling Method</label>
        <div className="control">
          <div className="select">
            <select
              value={tile}
              onChange={(event) => {
                setTile(event.target.value);
              }}
            >
              {Object.keys(tileFunction).map((name) => {
                return (
                  <option key={name} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <figure className="image is-4by3">
        {data && <Treemap data={data} tile={tile} />}
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
