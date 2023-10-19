import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SaleLineChart = ({ show }) => {
  const [tag, setTag] = useState(show);
  const oRecords = useSelector((state) => state?.overviewSlice.oRecords);

  const [data, setData] = useState();
  useEffect(() => {
    setData(oRecords);
  }, []);
  //console.log("oRecords", oRecords);

  useEffect(() => {
    setData(oRecords);
  }, [oRecords]);

  useEffect(() => {
    setTag(show);
  }, [show]);
  console.log("show", tag);

  return (
    <div style={{ width: "100%" }} className=" w-full">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
     
          {tag === "year" || tag==='week' ? <XAxis dataKey="sale_date" /> : <XAxis />}

          <YAxis dataKey="total" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SaleLineChart;
