import React, { memo } from "react";
import {
  ResponsiveContainer, LineChart, CartesianGrid,
  XAxis, YAxis, Legend, Line, Tooltip, Brush
} from "recharts";
import { DateTime as DT } from "luxon";

export function LineGraph(props) {
  console.log(props, "Line Graph Props");

  let dataMap = props.data && props.data.map((d, i) => {
    let date = DT.fromISO(d.created_at).toMillis();
    let map = { Time: date, [props.type]: parseFloat(d.values) };
    return map;
  });

  console.log("data map", dataMap)

  return (
    <ResponsiveContainer
      width={"100%"}
      height={props.height}
    >
      <LineChart
        data={dataMap}
      >
        {/* <CartesianGrid strokeDasharray="5 5" /> */}
        <XAxis domain={props.xDomain} scale="time" type="number" dataKey="Time" tickFormatter={(unixTime) => DT.fromMillis(unixTime).toFormat(DT.TIME_SIMPLE)} />
        <YAxis domain={props.yDomain} unit={props.unit} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={props.type} stroke="#02bbfe" activeDot={true} animationDuration={500} animationBegin={100} />
        {/* <Line type="monotone" dataKey={props.type[1]} stroke="#82ca9d" /> */}
        {props.brush && <Brush />}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default memo(LineGraph, (prev, next) => { return prev.data === next.data });