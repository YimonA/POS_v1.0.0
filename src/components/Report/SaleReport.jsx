import { Button } from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiFileMinusBold } from "react-icons/pi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SaleTinyBarChart from "./SaleTinyBarChart";
import SalePieChart from "./SalePieChart";
import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import Cookies from "js-cookie";
import {
  useGetProductSaleReportQuery,
  useGetWeeklySaleReportQuery,
  useGetMonthlySaleReportQuery,
  useGetYearlySaleReportQuery,
  useGetTodaySaleReportQuery,
  useGetBrandSaleReportQuery,
} from "../../redux/api/reportSaleApi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addBrandSaleReport,
  addProductSaleReport,
  addTodaySaleReport,
  addWeeklySaleReport,
  addMonthlySaleReport,
  addYearlySaleReport,
} from "../../redux/services/reportSaleSlice";

const SaleReport = () => {
  const [show, setShow] = useState("monthly");
  const [vouchers, setVouchers] = useState();
  const { liHandler } = useContextCustom();
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { data: pdata } = useGetProductSaleReportQuery(token);
  const { data: wdata } = useGetWeeklySaleReportQuery(token);
  const { data: mdata } = useGetMonthlySaleReportQuery(token);
  const { data: ydata } = useGetYearlySaleReportQuery(token);

  const { data: tdata } = useGetTodaySaleReportQuery(token);
  const { data: bdata } = useGetBrandSaleReportQuery(token);
  const productData = useSelector((state) => state.reportSaleSlice.pData);
  const weeklyData = useSelector((state) => state.reportSaleSlice.wData);
  const monthlyData = useSelector((state) => state.reportSaleSlice.mData);
  const yearlyData = useSelector((state) => state.reportSaleSlice.yData);
  const todayData = useSelector((state) => state.reportSaleSlice.tData);
  const brandData = useSelector((state) => state.reportSaleSlice.bData);

  // console.log("pdata", productData?.productInfo);
  // console.log("wdata", weeklyData);
  // console.log("mdata", monthlyData);
  // console.log('weeke',weeklyData?.weekly_lowest_sale?.sale_date)
  // console.log("tdata", todayData);
  // console.log("bdata", brandData);

  // console.log("pdata", pdata?.productInfo);
  // console.log("wddata", mdata);
  // console.log("ydata", ydata);
  console.log("mata", mdata);
  // console.log("tdata", tdata);
  // console.log("bdata", bdata);
  console.log("monthlyData", monthlyData);
  // console.log("yearlyData", yearlyData);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await axios({
      method: "get",
      url: `https://h.mmsdev.site/api/v1/voucher`,
      headers: { authorization: `Bearer ${token}` },
      responseType: "sale",
    });
    const voucher = await JSON.parse(data?.data);
    setVouchers(voucher?.data);
    //console.log("data", data);
  };

  useEffect(() => {
    dispatch(addProductSaleReport({ pdata }));
  }, [pdata]);
  useEffect(() => {
    dispatch(addBrandSaleReport({ bdata }));
  }, [bdata]);
  useEffect(() => {
    dispatch(addTodaySaleReport({ tdata }));
  }, [tdata]);
  useEffect(() => {
    dispatch(addWeeklySaleReport({ wdata }));
  }, [wdata]);
  useEffect(() => {
    dispatch(addMonthlySaleReport({ mdata }));
  }, [mdata]);
  useEffect(() => {
    dispatch(addYearlySaleReport({ ydata }));
    //   console.log("pdata", pdata?.productInfo);
    // console.log("wddata", mdata);
    // console.log("ydata", wdata);
    // console.log("mata", ydata);
    // console.log("tdata", tdata);
    // console.log("bdata", bdata);
  }, [ydata]);

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-10">
        <div>
          <p className="breadcrumb-title	">Sale</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Report / Sale
          </p>
        </div>

        {/* btn group start */}
        <Button.Group className=" border-[--border-color] flex justify-end basis-1/3">
          <Button
            onClick={() => setShow("yearly")}
            variant="default"
            className={`${
              show === "yearly"
                ? " text-[--font-color]"
                : " text-[--secondary-color]"
            } hover:text-[--font-color] hover:bg-transparent rounded-[5px]`}
          >
            Year
          </Button>
          <Button
            onClick={() => setShow("monthly")}
            variant="default"
            className={`${
              show === "monthly"
                ? " text-[--font-color]"
                : " text-[--secondary-color]"
            } hover:text-[--font-color] hover:bg-transparent rounded-[5px]`}
          >
            Month
          </Button>
          <Button
            onClick={() => setShow("weekly")}
            variant="default"
            className={`${
              show === "weekly"
                ? " text-[--font-color]"
                : " text-[--secondary-color]"
            }  text-[--font-color] hover:text-[--font-color] hover:bg-transparent rounded-[5px]`}
          >
            week
          </Button>
        </Button.Group>
        {/* btn group end */}
      </div>
      {/* Breadcrumg end */}

      {/* sale week start */}
      <div className=" flex items-stretch gap-5">
        <div className="basis-1/3 border-[1px] border-[var(--border-color)] p-5 flex flex-col gap-3 rounded-[3px]">
          <span className=" text-[20px] font-medium text-[var(--secondary-color)] flex justify-between items-center mb-3">
            Today Sales
            <BsThreeDotsVertical
              className="text-[var(--secondary-color)]"
              size={"1.5rem"}
            />
          </span>
          <p className=" text-[42px] font-medium text-[var(--secondary-color)] mb-3 flex justify-between items-center">
            {todayData ? Math.round(todayData?.total_amount) : null}
            <span className=" text-[16px] font-normal text-[var(--gray-color)]">
              Kyats
            </span>
          </p>

          {vouchers?.voucher.slice(0, 3)?.map((v) => {
            return (
              <div
                key={v?.id}
                className=" flex justify-between items-center border-t-[1px] border-t-[var(--border-color)] py-3"
              >
                <p className=" font-semibold text-[12px] text-[var(--secondary-color)] flex justify-between items-center gap-3">
                  <PiFileMinusBold
                    className=" me-3 text-[var(--font-color)]"
                    size={"1.3rem"}
                  />
                  {v?.voucher_number}
                </p>
                <p className=" font-semibold text-[12px] text-[var(--secondary-color)] flex justify-between items-center gap-5">
                  {Math.ceil(v?.total)}{" "}
                  <span className=" flex justify-between items-center gap-3">
                    85%{" "}
                    <IoIosArrowUp className=" text-green-500" size={"1.3rem"} />
                  </span>
                </p>
              </div>
            );
          })}
          <Link to={"/recent"} className=" ms-auto">
            <button
              onClick={() => liHandler("recent")}
              className="w-[150px] h-[40px] font-medium text-[14px] bg-transparent text-[var(--secondary-color)] border-[var(--secondary-color)] rounded border px-2 py-1 "
            >
              RECENT SALES
            </button>
          </Link>
        </div>
        {/* weekly sale */}
        {show === "weekly" ? (
          <div className="basis-2/3 border-[1px] border-[var(--border-color)] p-5 rounded-[3px]">
            <p className=" text-[20px] font-medium text-[var(--secondary-color)] mb-3">
              Weekly Sales
            </p>
            <p className=" text-[14px] font-normal text-[var(--gray-color)]  mb-3">
              Total {weeklyData?.weekly_sale_total} k Sales
            </p>
            <div className="flex items-stretch gap-3">
              <div className="basis-3/5">
                <SaleTinyBarChart wdata={wdata?.weekly_sale} tag={show} />
              </div>
              <div className="basis-2/5 flex flex-col gap-5">
                <div className=" flex justify-center gap-2">
                  <p className=" w-12 h-12 border-[1px] border-[var(--border-color)] text-[var(--secondary-color)] flex justify-center items-center rounded-[5px]">
                    {weeklyData?.weekly_highest_sale?.sale_date.substring(0, 2)}
                  </p>
                  <div className="px-3">
                    <p className=" text-white text-[14px] font-semibold flex items-center gap-5">
                      <span className="w-[55px]">Highest</span>
                      <IoIosArrowUp
                        className=" text-green-500"
                        size={"1.3rem"}
                      />
                      <span className=" text-green-500">
                        {weeklyData?.weekly_highest_percentage}
                      </span>
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      {weeklyData?.weekly_highest_sale?.sale_date}
                    </p>
                  </div>
                  <div className="ms-auto">
                    <p className=" text-white text-[14px] font-semibold">
                      {weeklyData?.weekly_highest_sale?.total}k
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      kyats
                    </p>
                  </div>
                </div>

                <div className=" flex justify-center gap-2">
                  <p className=" w-12 h-12 border-[1px] border-[var(--border-color)] flex justify-center items-center text-[var(--secondary-color)] rounded-[5px]">
                    A
                  </p>
                  <div className="px-3">
                    <p className=" text-white text-[14px] font-semibold ">
                      Average
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      Income
                    </p>
                  </div>
                  <div className="ms-auto">
                    <p className=" text-white text-[14px] font-semibold">
                      {weeklyData?.average}
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      kyats
                    </p>
                  </div>
                </div>
                <div className=" flex justify-center gap-2">
                  <p className=" w-12 h-12 border-[1px] border-[var(--border-color)] flex justify-center items-center text-[var(--secondary-color)] rounded-[5px]">
                    {weeklyData?.weekly_lowest_sale?.sale_date.substring(0, 2)}
                  </p>
                  <div className="px-3">
                    <p className=" text-white text-[14px] font-semibold flex items-center gap-5">
                      <span className="w-[55px]">Lowest</span>
                      <IoIosArrowDown
                        className=" text-red-500"
                        size={"1.3rem"}
                      />
                      <span className=" text-red-500">
                        {weeklyData?.weekly_lowest_percentage}
                      </span>
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      {weeklyData?.weekly_lowest_sale?.sale_date}
                    </p>
                  </div>
                  <div className="ms-auto">
                    <p className=" text-white text-[14px] font-semibold">
                      {weeklyData?.weekly_lowest_sale?.total}
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      kyats
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* monthly sale */}
        {show === "monthly" ? (
          <div className="basis-2/3 border-[1px] border-[var(--border-color)] p-5 rounded-[3px]">
            <p className=" text-[20px] font-medium text-[var(--secondary-color)] mb-3">
              Monthly Sales
            </p>
            <p className=" text-[14px] font-normal text-[var(--gray-color)]  mb-3">
              Total {monthlyData?.monthly_sale_total.toFixed(2)} k Sales
            </p>
            <div className="flex items-stretch gap-3">
              <div className="basis-3/5">
                <SaleTinyBarChart wdata={mdata?.monthly_sale} tag={show} />
              </div>
              <div className="basis-2/5 flex flex-col gap-5">
                <div className=" flex justify-center gap-2">
                  <p className=" w-12 h-12 border-[1px] border-[var(--border-color)] text-[var(--secondary-color)] flex justify-center items-center rounded-[5px]">
                    {monthlyData?.monthly_highest_sale?.sale_date.substring(0,2)}
                  </p>
                  <div className="px-3">
                    <p className=" text-white text-[14px] font-semibold flex items-center gap-5">
                      <span className="w-[55px]">Highest</span>
                      <IoIosArrowUp
                        className=" text-green-500"
                        size={"1.3rem"}
                      />
                      <span className=" text-green-500">
                        {monthlyData?.monthly_highest_percentage}
                      </span>
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      {monthlyData?.monthly_highest_sale?.sale_date}
                    </p>
                  </div>
                  <div className="ms-auto">
                    <p className=" text-white text-[14px] font-semibold">
                      {monthlyData?.monthly_highest_sale?.total}
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      kyats
                    </p>
                  </div>
                </div>

                <div className=" flex justify-center gap-2">
                  <p className=" w-12 h-12 border-[1px] border-[var(--border-color)] flex justify-center items-center text-[var(--secondary-color)] rounded-[5px]">
                    A
                  </p>
                  <div className="px-3">
                    <p className=" text-white text-[14px] font-semibold ">
                      Average
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      Income
                    </p>
                  </div>
                  <div className="ms-auto">
                    <p className=" text-white text-[14px] font-semibold">
                      {monthlyData?.average.toFixed(2)}
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      kyats
                    </p>
                  </div>
                </div>

                <div className=" flex justify-center gap-2">
                  <p className=" w-12 h-12 border-[1px] border-[var(--border-color)] flex justify-center items-center text-[var(--secondary-color)] rounded-[5px]">
                    {monthlyData?.monthly_lowest_sale?.sale_date.substring(0,2)}
                  </p>
                  <div className="px-3">
                    <p className=" text-white text-[14px] font-semibold flex items-center gap-5">
                      <span className="w-[55px]">Lowest</span>
                      <IoIosArrowDown
                        className=" text-red-500"
                        size={"1.3rem"}
                      />
                      <span className=" text-red-500">
                        {monthlyData?.monthly_lowest_percentage}
                      </span>
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      {monthlyData?.monthly_lowest_sale?.sale_date}
                    </p>
                  </div>
                  <div className="ms-auto">
                    <p className=" text-white text-[14px] font-semibold">
                      {monthlyData?.monthly_lowest_sale?.total.toFixed(2)}
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      kyats
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* yearly sale */}
        {show === "yearly" ? (
          <div className="basis-2/3 border-[1px] border-[var(--border-color)] p-5 rounded-[3px]">
            <p className=" text-[20px] font-medium text-[var(--secondary-color)] mb-3">
              Yearly Sales
            </p>
            <p className=" text-[14px] font-normal text-[var(--gray-color)]  mb-3">
              Total {yearlyData?.TotalMonthlySalesAmount.toFixed(2)} k Sales
            </p>
            <div className="flex items-stretch gap-3">
              <div className="basis-3/5">
                <SaleTinyBarChart wdata={ydata?.monthly_sales} tag={show} />
              </div>
              <div className="basis-2/5 flex flex-col gap-5">
                <div className=" flex justify-center gap-2">
                  <p className=" w-12 h-12 border-[1px] border-[var(--border-color)] text-[var(--secondary-color)] flex justify-center items-center rounded-[5px]">
                    {yearlyData?.MonthlyHighestSale[0]?.highest_sale_month}
                  </p>
                  <div className="px-3">
                    <p className=" text-white text-[14px] font-semibold flex items-center gap-5">
                      <span className="w-[55px]">Highest</span>
                      <IoIosArrowUp
                        className=" text-green-500"
                        size={"1.3rem"}
                      />
                      <span className=" text-green-500">
                        {yearlyData?.MonthlyHighestSale[0]?.percentage}
                      </span>
                    </p>
                  </div>
                  <div className="ms-auto">
                    <p className=" text-white text-[14px] font-semibold">
                      {yearlyData?.MonthlyHighestSale[0]?.highest_sale}
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      kyats
                    </p>
                  </div>
                </div>

                <div className=" flex justify-center gap-2">
                  <p className=" w-12 h-12 border-[1px] border-[var(--border-color)] flex justify-center items-center text-[var(--secondary-color)] rounded-[5px]">
                    A
                  </p>
                  <div className="px-3">
                    <p className=" text-white text-[14px] font-semibold ">
                      Average
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      Income
                    </p>
                  </div>
                  <div className="ms-auto">
                    <p className=" text-white text-[14px] font-semibold">
                      {yearlyData?.MonthlyAverageAmount.toFixed(2)}
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      kyats
                    </p>
                  </div>
                </div>
                <div className=" flex justify-center gap-2">
                  <p className=" w-12 h-12 border-[1px] border-[var(--border-color)] flex justify-center items-center text-[var(--secondary-color)] rounded-[5px]">
                    {yearlyData?.MonthlyLowestSale[0]?.lowest_sale_month}
                  </p>
                  <div className="px-3">
                    <p className=" text-white text-[14px] font-semibold flex items-center gap-5">
                      <span className="w-[55px]">Lowest</span>
                      <IoIosArrowDown
                        className=" text-red-500"
                        size={"1.3rem"}
                      />
                      <span className=" text-red-500">
                        {yearlyData?.MonthlyLowestSale[0]?.percentage}
                      </span>
                    </p>
                  </div>
                  <div className="ms-auto">
                    <p className=" text-white text-[14px] font-semibold">
                      {yearlyData?.MonthlyLowestSale[0]?.lowest_sale.toFixed(2)}
                    </p>
                    <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                      kyats
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* sale week end */}

      {/* product sale start */}
      <div className="flex items-stretch mt-16 gap-5">
        <div className=" basis-2/3 border-[1px] border-[var(--border-color)] p-5 rounded-[3px]">
          <p className=" text-[20px] font-medium text-[var(--secondary-color)] mb-5">
            Product Sales
          </p>
          <table className=" w-full text-gray-200 border border-gray-700 text-sm ">
            <thead>
              <tr className=" border-b border-b-gray-700 w-[80%]">
                <th className=" py-4 text-center px-1 uppercase font-medium">
                  No
                </th>
                <th className=" py-4 text-end px-1 uppercase font-medium">
                  Name
                </th>
                <th className=" py-4 text-end px-1 uppercase font-medium">
                  Brand
                </th>
                <th className=" py-4 text-end px-1 uppercase font-medium">
                  Sale Price
                </th>
                <th className=" py-4 pe-4 text-end px-1 uppercase font-medium"></th>
              </tr>
            </thead>
            <tbody className=" text-gray-100">
              {productData?.productInfo?.length > 0 ? (
                productData?.productInfo?.map((product, index) => {
                  return (
                    <tr
                      key={index}
                      className=" border-b border-b-gray-700 cursor-pointer"
                    >
                      <td className="px-1 text-center  py-4">{index + 1}</td>
                      <td className="px-1 text-end py-4 ">{product?.name} </td>
                      <td className="px-1 py-4 text-end">{product?.brand}</td>
                      <td className="px-1 pe-4 py-4 text-end">
                        {product?.sale_price}
                      </td>

                      <td></td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="px-1 text-center py-4 " colSpan={4}>
                    There is no data now.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className=" basis-1/3 border-[1px] border-[var(--border-color)] px-5 rounded-[3px]">
          <p className=" text-[20px] font-medium text-[var(--secondary-color)] pt-5">
            Weekly Brand Sales
          </p>
          <SalePieChart bdata={brandData} />
        </div>
      </div>
      {/* product sale end */}
    </div>
  );
};

export default SaleReport;
