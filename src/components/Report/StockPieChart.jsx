import { PieChart, Pie, Cell } from "recharts";
import PropTypes from "prop-types";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

const COLORS = ["#8AB4F8", "#56CA00", "#aa4d64", "#e8eaed", "#6a88b8"];


const StockPieChart = ({ weekelyBrand }) => {
  StockPieChart.propTypes = {
    weekelyBrand: PropTypes.array,
  };
  const w = weekelyBrand;

  const [colors, setColors] = useState([
    "bg-[#8AB4F8]",
    "bg-[#56CA00]",
    "bg-[#aa4d64]",
    "bg-[#e8eaed]",
    "bg-[#6a88b8]",
  ]);
  const [data, setData] = useState(
    [...weekelyBrand].sort((a, b) => b.total_brand_sale - a.total_brand_sale)
  );

  console.log("weekelyBrand", weekelyBrand);
  console.log("w", data);

  return (
    <div className="h-[240px] flex justify-start items-stretch py-3">
      <PieChart width={300} height={210} className="">
        <Pie
          data={data?.slice(0, 4)}
          cx={120}
          cy={110}
          innerRadius={50}
          outerRadius={80}
          fill="#8ab4f8"
          paddingAngle={9}
          dataKey="total_brand_sale"
          className=" mx-auto inline-block"
        >
          {data?.slice(0, 4)?.map((entry, index) => (
            <Cell
              key={`cell-${entry?.total_brand_sale}`}
              fill={COLORS[index]}
            />
          ))}
        </Pie>
      </PieChart>
      <div className=" w-full h-full flex flex-col justify-center items-center gap-2 ">
        {data?.slice(0, 4)?.map((wbrand, index) => {
          return (
            <div
              key={index}
              className="w-full flex justify-between items-center gap-3"
            >
              <p className=" font-semibold text-[14px] text-[var(--secondary-color)] flex justify-between items-center gap-3">
                <span
                  className={` w-3 h-3 mr-2 rounded-full ${colors[index]}`}
                ></span>
                {wbrand?.brand_name}
              </p>
              <p className=" font-semibold text-[14px] text-[var(--secondary-color)] flex justify-between items-center gap-5">
                100
                <span className=" flex justify-between items-center gap-3">
                  {wbrand?.total_brand_sale}%
                  <IoIosArrowUp className=" text-green-500" size={"1.3rem"} />
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockPieChart;
