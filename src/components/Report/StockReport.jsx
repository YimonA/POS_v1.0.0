import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiBandaids } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { useContextCustom } from "../../context/stateContext";
import { IoIosArrowUp } from "react-icons/io";
import StockPieChart from "./StockPieChart";
import StockOverview from "../Inventory/StockOverview";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addBrandReport,
  addStockReport,
  addWeekelyBestBrands,
} from "../../redux/services/reportStockSlice.js";
import {
  useGetBrandsReportQuery,
  useGetStockOverviewQuery,
  useGetWeekelyBestBrandsQuery,
} from "../../redux/api/reportStockApi";

const StockReport = () => {
  const [page,setPage]=useState(1);
  const { liHandler } = useContextCustom();
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const {data:stockReport}=useGetStockOverviewQuery({token,page});
  const { data: bBData } = useGetWeekelyBestBrandsQuery(token);
  const { data: brandReportData } = useGetBrandsReportQuery(token);
  const weekelyBestBrands = useSelector(
    (state) => state.reportStockSlice.weekelyBestBrands
  );
  const brandReport = useSelector(
    (state) => state.reportStockSlice.brandReport
  );
  const stockReportData = useSelector(
    (state) => state.reportStockSlice.stockReport
  );

   //console.log("weekelyBestBrands", weekelyBestBrands);
  // console.log("brandReport", brandReport);
  // console.log("stockReport", stockReport);
  // console.log("weekelyBestBrands", brandReportData);
   //console.log("brandReport", bBData);
  // console.log("stockReport", stockReport);

  useEffect(() => {
    dispatch(addStockReport({ stockReport }));
  }, [stockReport]);

  useEffect(() => {
    dispatch(addWeekelyBestBrands({ bBData }));
  }, [bBData]);

  useEffect(() => {
    dispatch(addBrandReport({ brandReportData }));
  }, [brandReportData]);

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-10">
        <div>
          <p className="breadcrumb-title	">Stock</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Report / Stock
          </p>
        </div>
        <div className=" flex gap-5 items-center">
          <Link to={"/cashier"}>
            <button
              onClick={() => liHandler("cashier")}
              className="w-[140px] h-[40px] font-semibold text-[16px] bg-transparent text-[var(--font-color)] border-[1px] border-[var(--border-color)] rounded-[5px]"
            >
              Go to Shop
            </button>
          </Link>
          {/* <Link to={"/add-product"}> */}
            <button
              onClick={() => liHandler("add product")}
              className="w-[170px] h-[40px] font-semibold text-[16px] myBlueBtn flex items-center justify-center gap-2"
            >
              <BsPlusLg size={"1.3rem"} />
              Add Product
            </button>
          {/* </Link> */}
        </div>
      </div>
      {/* Breadcrumg end */}

      {/* overview section start */}
      <section className=" flex items-stretch gap-5 mb-10">
        <div className=" basis-1/2 flex flex-col items-stretch gap-5">
          <div className=" flex items-stretch gap-5">
            <div className="basis-1/2 border-[1px] border-[var(--border-color)] flex justify-center items-center gap-8 rounded-[3px] p-5">
              <div className=" w-[100px] h-[100px] rounded-full bg-zinc-700 flex justify-center items-center">
                <div className=" w-[70px] h-[70px] rounded-full border border-[var(--font-color)]  bg-[var(--border-color)] flex justify-center items-center">
                  <MdOutlineProductionQuantityLimits
                    size={"1.5rem"}
                    className=" text-[var(--font-color)]"
                  />
                </div>
              </div>
              <div>
                <p className=" font-semibold text-[26px] text-[var(--secondary-color)] mb-3">
                  {brandReport?.totalProducts} k
                </p>
                <p className=" font-medium text-[14px] text-[var(--secondary-color)]">
                  Total Products
                </p>
              </div>
            </div>
            <div className="basis-1/2 border-[1px] border-[var(--border-color)] flex justify-center items-center gap-8 rounded-[3px] p-5">
              <div className=" w-[100px] h-[100px] rounded-full bg-zinc-700 flex justify-center items-center">
                <div className=" w-[70px] h-[70px] rounded-full border border-[var(--font-color)]  bg-[var(--border-color)] flex justify-center items-center">
                  <PiBandaids
                    size={"1.5rem"}
                    className=" text-[var(--font-color)]"
                  />
                </div>
              </div>
              <div>
                <p className=" font-semibold text-[26px] text-[var(--secondary-color)] mb-3">
                  {brandReport?.totalBrands}
                </p>
                <p className=" font-medium text-[14px] text-[var(--secondary-color)]">
                  Total Brands
                </p>
              </div>
            </div>
          </div>

          <div className=" flex flex-col border-[1px] border-[var(--border-color)] p-5 rounded-[3px]">
            {/* Progress bar start */}
            <div className="flex">
              <div className=" basis-2/3 flex w-full">
                <p className="w-full h-2 ">
                  <span className="w-[70%] h-2 bg-green-500 inline-block border-l-[1px] rounded-full"></span>
                  <span className="w-[20%] h-2 bg-[#8AB4F8] inline-block "></span>
                  <span className="w-[10%] h-2 bg-red-500 inline-block border-r-[1px] rounded-full"></span>
                </p>
              </div>
              <div className=" basis-1/3">
                <p className=" text-right font-semibold text-[26px] text-[var(--secondary-color)] mb-3">
                  28,500 k
                </p>
                <p className=" text-right font-medium text-[14px] text-[var(--gray-color)]">
                  Kyats
                </p>
              </div>
            </div>
            {/* Progress bar end */}

            <div className=" flex justify-between items-center border-b-[1px] border-b-[var(--border-color)] py-3">
              <p className=" font-semibold text-[14px] text-[var(--secondary-color)] flex justify-between items-center gap-3">
                <span className=" w-3 h-3 rounded-full bg-green-500"></span>
                {/* {v?.voucher_number} */}
                Instock
              </p>
              <p className=" font-semibold text-[14px] text-[var(--secondary-color)] flex justify-between items-center gap-5">
                {/* {Math.ceil(v?.total)}{" "} */}
                100
                <span className=" flex justify-between items-center gap-3">
                  {brandReport?.stocks?.inStock?.substring(0,4)}
                  <IoIosArrowUp className=" text-green-500" size={"1.3rem"} />
                </span>
              </p>
            </div>
            <div className=" flex justify-between items-center border-b-[1px] border-b-[var(--border-color)] py-3">
              <p className=" font-semibold text-[14px] text-[var(--secondary-color)] flex justify-between items-center gap-3">
                <span className=" w-3 h-3 rounded-full bg-[#8AB4F8]"></span>
                {/* {v?.voucher_number} */}
                Low Stock
              </p>
              <p className=" font-semibold text-[14px] text-[var(--secondary-color)] flex justify-between items-center gap-5">
                {/* {Math.ceil(v?.total)}{" "} */}
                100
                <span className=" flex justify-between items-center gap-3">
                  {brandReport?.stocks?.lowStockoutOfStock?.substring(0,4)}
                  <IoIosArrowUp className=" text-green-500" size={"1.3rem"} />
                </span>
              </p>
            </div>
            <div className=" flex justify-between items-center  py-3">
              <p className=" font-semibold text-[14px] text-[var(--secondary-color)] flex justify-between items-center gap-3">
                <span className=" w-3 h-3 rounded-full bg-red-500"></span>
                {/* {v?.voucher_number} */}
                Out of Stock
              </p>
              <p className=" font-semibold text-[14px] text-[var(--secondary-color)] flex justify-between items-center gap-5">
                {/* {Math.ceil(v?.total)}{" "} */}
                100
                <span className=" flex justify-between items-center gap-3">
                  {brandReport?.stocks?.outOfStock?.substring(0,4)}
                  <IoIosArrowUp className=" text-green-500" size={"1.3rem"} />
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Best Seller Brands start */}
        <div className=" basis-1/2 border-[1px] border-[var(--border-color)] p-5 rounded-[3px]">
          <p className="text-[22px] font-semibold text-[var(--secondary-color)] mb-4">
            Weekly Best Seller Brands
          </p>
          <p className=" text-right font-semibold text-[26px] text-[var(--secondary-color)] mb-3">
            28,500
          </p>
          <p className=" text-right font-medium text-[14px] text-[var(--gray-color)]">
            Kyats
          </p>
          <StockPieChart weekelyBrand={weekelyBestBrands} />
        </div>
        {/* Best Seller Brands end */}
      </section>
      {/* overview section end */}

      {/* stock overview start */}
      <StockOverview />
      {/* stock overview end */}
    </div>
  );
};

export default StockReport;
