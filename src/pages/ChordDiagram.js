import React from "react";
import * as d3 from "d3";

const transpose = (matrix) => {
  return matrix.map((_, i) => matrix.map((row) => row[i]));
};

const ChordDiagram = ({ labels, matrix, color }) => {
  const width = 600;
  const height = 600;
  const innerRadius = 250;
  const outerRadius = 270;

  const chord = d3
    .chord()
    .padAngle(0.1)
    .sortGroups(d3.descending)
    .sortSubgroups(d3.descending);
  const chords = chord(matrix);

  const ribbon = d3.ribbon().radius(innerRadius);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        <g>
          {chords.map((d, i) => (
            <path
              key={i}
              d={ribbon(d)}
              fill={color(d.target.index)}
              stroke={d3.rgb(color(d.index)).darker()}
              opacity="0.67"
            />
          ))}
        </g>
        <g>
          {chords.groups.map((d, i) => (
            <g key={i}>
              <path
                d={arc(d)}
                fill={color(d.index)}
                stroke={d3.rgb(color(d.index)).darker()}
              />
              <text
                transform={`rotate(${
                  ((d.startAngle + d.endAngle) * 90) / Math.PI
                })translate(0,${-outerRadius - 5})`}
                textAnchor="middle"
                fontSize="12"
              >
                {labels[i]}
              </text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
};

export const ChordDiagramPage = () => {
  const labels = [
    "農林水産業",
    "鉱業",
    "製造業",
    "建設",
    "電力・ガス・水道",
    "商業",
    "金融・保険",
    "不動産",
    "運輸・郵便",
    "情報通信",
    "公務",
    "サービス",
    "分類不明",
  ];
  const matrix = [
    [
      0.121022,
      0.000099,
      0.026883,
      0.001084,
      0.0,
      0.000094,
      0.0,
      0.000002,
      0.000044,
      0.0,
      0.000045,
      0.006104,
      0.0,
    ],
    [
      0.000015,
      0.00193,
      0.05815,
      0.006209,
      0.268109,
      0.0,
      0.0,
      0.0,
      0.000002,
      0.0,
      0.000007,
      0.000005,
      0.000091,
    ],
    [
      0.219755,
      0.088817,
      0.444272,
      0.27473,
      0.088045,
      0.032866,
      0.03087,
      0.002749,
      0.146165,
      0.049844,
      0.066535,
      0.128693,
      0.090783,
    ],
    [
      0.005862,
      0.008012,
      0.004624,
      0.00141,
      0.045799,
      0.006885,
      0.005871,
      0.044329,
      0.014242,
      0.006992,
      0.020562,
      0.005801,
      0.0,
    ],
    [
      0.01072,
      0.038841,
      0.018742,
      0.005317,
      0.111325,
      0.022474,
      0.00564,
      0.00591,
      0.014029,
      0.008644,
      0.013665,
      0.020852,
      0.012958,
    ],
    [
      0.054769,
      0.025301,
      0.056294,
      0.070601,
      0.015489,
      0.020563,
      0.006753,
      0.0016,
      0.027478,
      0.014613,
      0.01287,
      0.042207,
      0.015197,
    ],
    [
      0.005864,
      0.035411,
      0.005751,
      0.013435,
      0.016147,
      0.017039,
      0.062699,
      0.075618,
      0.020645,
      0.004759,
      0.041345,
      0.008333,
      0.004818,
    ],
    [
      0.002115,
      0.009895,
      0.002035,
      0.00464,
      0.006801,
      0.034353,
      0.019676,
      0.021942,
      0.021079,
      0.026314,
      0.001554,
      0.013281,
      0.038972,
    ],
    [
      0.05163,
      0.256433,
      0.026334,
      0.042635,
      0.034993,
      0.056316,
      0.03387,
      0.002471,
      0.106275,
      0.025261,
      0.034488,
      0.022113,
      0.079345,
    ],
    [
      0.003396,
      0.010252,
      0.006543,
      0.00902,
      0.017517,
      0.040131,
      0.059256,
      0.004032,
      0.011249,
      0.152131,
      0.026534,
      0.03507,
      0.042354,
    ],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.226847],
    [
      0.026356,
      0.069849,
      0.062692,
      0.104466,
      0.121302,
      0.07754,
      0.113446,
      0.030465,
      0.128232,
      0.179296,
      0.098074,
      0.095386,
      0.089706,
    ],
    [
      0.013418,
      0.007628,
      0.002872,
      0.014916,
      0.004262,
      0.007184,
      0.003934,
      0.00484,
      0.007748,
      0.006568,
      0.00086,
      0.00574,
      0.0,
    ],
  ];
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  return (
    <div>
      <ChordDiagram labels={labels} matrix={matrix} color={color} />
      <ChordDiagram labels={labels} matrix={transpose(matrix)} color={color} />
    </div>
  );
};
