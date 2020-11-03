import React from "react";
import {
  ResponsiveContainer, LineChart, CartesianGrid,
  XAxis, YAxis, Legend, Line, Tooltip, Brush
} from "recharts";
import moment from "moment";

export default function LineGraph(props) {
  console.log(props);

  let dataMap = props.data.map((d, i) => {
    let date = moment(d.created_at).format("HH:MM:SS");
    let map = { Time: date, [props.type]: parseFloat(d.values) };
    return map;
  });

  return (
    <ResponsiveContainer
      width={"100%"}
      height={props.height}
    >
      <LineChart
        data={dataMap}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey={props.type} stroke="#02bbfe" />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        {props.brush && <Brush />}
      </LineChart>
    </ResponsiveContainer>
  );
}
