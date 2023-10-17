import { PieChart, Pie, Cell } from "recharts";
import PropTypes from "prop-types";
import { useState } from "react";

const COLORS = ["#8AB4F8", "#56CA00", "#aa4d64", "#e8eaed", "#6a88b8"];

const SalePieChart = ({ bdata }) => {
  SalePieChart.propTypes = {
    bdata: PropTypes.object,
  };
  const data = bdata?.brandsInfo;
  const[colors,setColors]=useState(['bg-[#8AB4F8]', 'bg-[#56CA00]', 'bg-[#aa4d64]', 'bg-[#e8eaed]','bg-[#6a88b8]'])
  
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
                fill={COLORS[index]}
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
                className={`${colors[index]} inline-block mr-2 w-3 h-3 rounded-full`}
              >
              </span>
              <span className=" text-[var(--gray-color)]">{bdata?.name}</span>
            </span>
          );
        })}

       
      </div>
    </div>
  );
};

export default SalePieChart;
