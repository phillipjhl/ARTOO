import React, { memo } from "react";
import {
  ResponsiveContainer, LineChart, CartesianGrid,
  XAxis, YAxis, Legend, Line, Tooltip, Brush
} from "recharts";
import { DateTime as DT } from "luxon";

export function LineGraph(props) {
  console.log(props, "Line Graph Props");

  let dataMap = props.data && props.data.map((d, i) => {
    let value = d.values;
    if (props.formatY) {
      value = props.formatY(value);
    }
    let date = DT.fromISO(d.created_at).toMillis();
    let map = { Time: date, [props.type]: parseFloat(value) };
    return map;
  });

  console.log("data map", dataMap)

  const formatTimeTick = (unix) => {
    let dt = DT.fromMillis(unix);
    return `${dt.hour}:${dt.minute}`;
  }

  return (
    <ResponsiveContainer
      width={"100%"}
      height={props.height}
    >
      <LineChart
        data={dataMap}
      >
        {/* <CartesianGrid strokeDasharray="5 5" /> */}
        <XAxis domain={props.xDomain} scale="time" type="number" dataKey="Time" tickFormatter={formatTimeTick} allowDataOverflow={true}/>
        <YAxis domain={props.yDomain} unit={props.unit} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={props.type} stroke="#02bbfe" activeDot={true} animationDuration={500} animationBegin={100} allowDataOverflow={true}/>
        {/* <Line type="monotone" dataKey={props.type[1]} stroke="#82ca9d" /> */}
        {props.brush && <Brush />}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default memo(LineGraph, (prev, next) => { return prev.data === next.data });