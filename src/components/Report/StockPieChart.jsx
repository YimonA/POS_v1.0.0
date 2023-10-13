import { PieChart, Pie, Cell } from "recharts";
import PropTypes from "prop-types";
import { IoIosArrowUp } from "react-icons/io";


const StockPieChart = ({ weekelyBrand }) => {
  StockPieChart.propTypes = {
    weekelyBrand: PropTypes.array,
  };
  const COLORS = ["#8AB4F8", "#6a88b8", "#404d64", "#e8eaed"];
  const data = weekelyBrand;
  // console.log("weekelyBrand", weekelyBrand);

  return (
      <div className="h-[240px] flex justify-start items-stretch py-3">
        <PieChart width={300} height={210} className="">
          <Pie
            data={data?.slice(0,4)}
            cx={120}
            cy={110}
            innerRadius={50}
            outerRadius={80}
            fill="#8ab4f8"
            paddingAngle={9}
            dataKey="total_brand_sale"
            className=" mx-auto inline-block"
          >
            {data?.slice(0,4)?.map((entry, index) => (
              <Cell
                key={`cell-${entry?.total_brand_sale}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div className=" w-full h-full flex flex-col justify-center items-center gap-2 ">
          {weekelyBrand?.slice(0,4)?.map((wbrand, index) => {
            return (
              <div
                key={index}
                className="w-full flex justify-between items-center gap-3"
              >
                <p className=" font-semibold text-[14px] text-[var(--secondary-color)] flex justify-between items-center gap-3">
                  <span className={` w-3 h-3 mr-2 rounded-full bg-[${COLORS[index % COLORS.length]}]`}></span>
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
