import React, { PureComponent, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useGetBrandSaleReportQuery } from "../../redux/api/reportSaleApi";
import Cookies from "js-cookie";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];
const COLORS = ["#8AB4F8", "#6a88b8", "#404d64", "#e8eaed"];

const SalePieChart = () => {
  const [brandData, setBrandData] = useState();
  const token = Cookies.get("token");
  const { data: bdata } = useGetBrandSaleReportQuery(token);
  console.log("bdata", bdata?.brandsInfo);

  return (
    <div className=" flex justify-center items-center">
      <PieChart
        width={300}
        height={320}
        className="flex justify-center items-center"
      >
        <Pie
          data={bdata?.brandsInfo}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8ab4f8"
          paddingAngle={5}
          dataKey="value"
          className=" mx-auto inline-block"
        >
          {bdata?.brandsInfo?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              className="bg-blue-300"
            />
          ))}
        </Pie>
        {/* <Pie
        data={data}
        cx={420}
        cy={200}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>  */}
      </PieChart>
    </div>
  );
};

export default SalePieChart;