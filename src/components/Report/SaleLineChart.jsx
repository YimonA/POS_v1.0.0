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
import { PureComponent, useEffect, useState } from "react";


const SaleLineChart = ({ oData, tag }) => {
  SaleLineChart.propTypes = {
    oData: PropTypes.object,
    tag: PropTypes.string,
  };
  const [data, setData] = useState();

  useEffect(() => {
    graphHandler();
  }, []);

  useEffect(() => {
    graphHandler();
  }, [tag]);

  function graphHandler() {
    if (tag === "weekly") {
      const data = oData?.weekely_sales;
      setData(data);
    } else if (tag === "monthly") {
      const data = oData?.monthly_sales;
      setData(data);
    } else if (tag === "yearly") {
      const data = oData?.yearly_sales;
      setData(data);
    }
  }

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
          {tag === "weeekly" ? (
            <XAxis dataKey="sale_date" />
          ) : tag === "monthly" ? (
            <XAxis 
            // dataKey='sale_date' 
            />
          ) : tag === "yearly" ? (
            <XAxis dataKey="month" />
          ) : null}
          <YAxis />
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
