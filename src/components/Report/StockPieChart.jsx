import { PieChart, Pie, Cell } from "recharts";
import PropTypes from "prop-types";
import { IoIosArrowUp } from "react-icons/io";

const COLORS = ["#8AB4F8", "#6a88b8", "#404d64", "#e8eaed"];

const StockPieChart = ({ weekelyBrand }) => {
  StockPieChart.propTypes = {
    weekelyBrand: PropTypes.array,
  };
  const data = weekelyBrand;
  console.log("weekelyBrand", weekelyBrand);

  return (
      <div className="flex justify-start items-center py-3">
        <PieChart width={300} height={320} className="">
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8ab4f8"
            paddingAngle={5}
            dataKey="total_brand_sale"
            className=" mx-auto inline-block"
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${entry?.total_brand_sale}`}
                fill={COLORS[index % COLORS.length]}
                className="bg-blue-300"
              />
            ))}
          </Pie>
        </PieChart>
        <div className=" w-full flex flex-col justify-start items-center gap-2 ">
          {weekelyBrand?.map((wbrand, index) => {
            return (
              <div
                key={index}
                className="w-full flex justify-between items-center gap-3"
              >
                <p className=" font-semibold text-[14px] text-[var(--secondary-color)] flex justify-between items-center gap-3">
                  <span className=" w-3 h-3 mr-2 rounded-full bg-[#8AB4F8]"></span>
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
