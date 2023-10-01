import { PieChart, Pie, Cell } from "recharts";
import PropTypes from "prop-types";
import { useState } from "react";

const COLORS = ["#8AB4F8", "#6a88b8", "#404d64", "#e8eaed", "#8f2e44"];

const SalePieChart = ({ bdata }) => {
  SalePieChart.propTypes = {
    bdata: PropTypes.object,
  };
  const [colors,setColors]=useState(["#8AB4F8", "#6a88b8", "#404d64", "#e8eaed", "#8f2e44"])
  const data = bdata?.brandsInfo;
  console.log("bdata", bdata?.brandsInfo);

  return (
    <div>
      <div className="flex justify-center items-center ">
        <PieChart width={300} height={320} className="">
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8ab4f8"
            paddingAngle={5}
            dataKey="brand_sales"
            className=" mx-auto inline-block"
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${entry?.brand_sales}`}
                fill={COLORS[index % COLORS.length]}
                className="bg-blue-300"
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className=" w-full flex justify-center items-center gap-2 mb-3">
        {data?.map((bdata, index) => {
          return (
            <span key={index}>
              <span
                className={`inline-block mr-2 w-3 h-3 rounded-full bg-[${COLORS[index % COLORS.length]}] `}
              >
              </span>
              <span className=" text-[var(--gray-color)]">{bdata?.name}</span>
            </span>
          );
        })}

        {/* <span className=" w-3 h-3 rounded-full bg-[#8AB4F8]"></span>
        <span className=" text-[var(--gray-color)]">Melo</span>
        <span className=" w-3 h-3 rounded-full bg-[#6a88b8]"></span>
        <span className=" text-[var(--gray-color)]">City</span>
        <span className=" w-3 h-3 rounded-full bg-[#404d64]"></span>
        <span className=" text-[var(--gray-color)]">Pro</span>
        <span className=" w-3 h-3 rounded-full bg-[#e8eaed]"></span>
        <span className=" text-[var(--gray-color)]">Dutch</span> */}
      </div>
    </div>
  );
};

export default SalePieChart;
