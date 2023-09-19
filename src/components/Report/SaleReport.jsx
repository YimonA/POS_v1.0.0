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
  useGetWeekelySaleReportQuery,
  useGetTodaySaleReportQuery,
} from "../../redux/api/reportSaleApi";
import { useEffect, useState } from "react";
import axios from "axios";

const SaleReport = () => {
  const [vouchers, setVouchers] = useState();
  const { liHandler } = useContextCustom();
  const token = Cookies.get("token");
  const { data: pdata } = useGetProductSaleReportQuery(token);
  const { data: wdata } = useGetWeekelySaleReportQuery(token);
  const { data: tdata } = useGetTodaySaleReportQuery(token);
  // console.log("pdata", pdata?.productInfo);
  console.log("wdata", wdata);
  console.log("tdata", tdata);

  useEffect(() => {
    fetchData();
    console.log("v", vouchers);
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
    console.log("data", data);
  };

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-10">
        <div>
          <p className="breadcrumb-title	">Sale</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Report / Sale
          </p>{" "}
        </div>

        {/* btn group start */}
        <Button.Group className=" border-[--border-color] flex justify-end basis-1/3">
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent rounded-[5px]"
          >
            Year
          </Button>
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent rounded-[5px]"
          >
            Month
          </Button>
          <Button
            variant="default"
            className=" text-[--font-color] hover:text-[--font-color] hover:bg-transparent rounded-[5px]"
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
            {tdata?.total_today_sale_amount}
            <span className=" text-[16px] font-normal text-[var(--gray-color)]">
              Kyats
            </span>
          </p>

          {vouchers?.voucher?.map((v, index) => {
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
            </button>{" "}
          </Link>
        </div>
        <div className="basis-2/3 border-[1px] border-[var(--border-color)] p-5 rounded-[3px]">
          <p className=" text-[20px] font-medium text-[var(--secondary-color)] mb-3">
            Weekly Sales
          </p>
          <p className=" text-[14px] font-normal text-[var(--gray-color)]  mb-3">
            Total {Math.floor(wdata?.totalWeeklySale)} k Sales
          </p>
          <div className="flex items-stretch gap-3">
            <div className="basis-3/5">
              <SaleTinyBarChart />
            </div>
            <div className="basis-2/5 flex flex-col gap-5">
              <div className=" flex justify-center gap-2">
                <p className=" w-12 h-12 border-[1px] border-[var(--border-color)] text-[var(--secondary-color)] flex justify-center items-center rounded-[5px]">
                  T
                </p>
                <div className="px-3">
                  <p className=" text-white text-[14px] font-semibold flex items-center gap-5">
                    <span className="w-[55px]">Highest</span>{" "}
                    <IoIosArrowUp className=" text-green-500" size={"1.3rem"} />
                    <span className=" text-green-500">35.5%</span>
                  </p>
                  <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                    12/6/2023
                  </p>
                </div>
                <div className="ms-auto">
                  <p className=" text-white text-[14px] font-semibold">
                    {Math.floor(wdata?.maxSale)} k
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
                    {Math.floor(wdata?.avgSale)} k
                  </p>
                  <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                    kyats
                  </p>
                </div>
              </div>
              <div className=" flex justify-center gap-2">
                <p className=" w-12 h-12 border-[1px] border-[var(--border-color)] flex justify-center items-center text-[var(--secondary-color)] rounded-[5px]">
                  S
                </p>
                <div className="px-3">
                  <p className=" text-white text-[14px] font-semibold flex items-center gap-5">
                    <span className="w-[55px]">Lowest</span>{" "}
                    <IoIosArrowDown className=" text-red-500" size={"1.3rem"} />
                    <span className=" text-red-500">3%</span>
                  </p>
                  <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                    12/6/2023
                  </p>
                </div>
                <div className="ms-auto">
                  <p className=" text-white text-[14px] font-semibold">
                    {Math.floor(wdata?.minSale)} k
                  </p>
                  <p className=" text-[var(--secondary-color)] font-normal text-[12px]">
                    kyats
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              {pdata?.productInfo?.map((product, index) => {
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
              })}
            </tbody>
          </table>
        </div>
        <div className=" basis-1/3 border-[1px] border-[var(--border-color)] px-5 rounded-[3px]">
          <p className=" text-[20px] font-medium text-[var(--secondary-color)] pt-5">
            Brand Sales
          </p>
          <SalePieChart />
          <div className=" flex justify-center items-center gap-3 mb-3">
            <span className=" w-3 h-3 rounded-full bg-[#8AB4F8]"></span>
            <span className=" text-[var(--gray-color)]">Melo</span>
            <span className=" w-3 h-3 rounded-full bg-[#6a88b8]"></span>
            <span className=" text-[var(--gray-color)]">City</span>
            <span className=" w-3 h-3 rounded-full bg-[#404d64]"></span>
            <span className=" text-[var(--gray-color)]">Pro</span>
            <span className=" w-3 h-3 rounded-full bg-[#e8eaed]"></span>
            <span className=" text-[var(--gray-color)]">Dutch</span>
          </div>
        </div>
      </div>
      {/* product sale end */}
    </div>
  );
};

export default SaleReport;
