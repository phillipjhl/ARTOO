import React from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryClipContainer,
} from "victory";

const data = [
  { x: 1, y: 13000 },
  { x: 2, y: 16500 },
  { x: 3, y: 14250 },
  { x: 4, y: 19000 },
];

export default function LineGraph(props) {
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        data={data}
        groupComponent={
          <VictoryClipContainer clipPadding={{ top: 5, right: 10 }} />
        }
        animate={{ duration: 500, onLoad: { duration: 500 } }}
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc" },
        }}
      />
    </VictoryChart>
  );
}
