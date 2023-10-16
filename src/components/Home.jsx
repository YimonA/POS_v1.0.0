import Cookies from "js-cookie";
import { useGetPhotoQuery } from "../redux/api/mediaApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addPhotos } from "../redux/services/mediaSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useContextCustom } from "../context/stateContext";
import SaleLineChart from "./Report/SaleLineChart";
import { BsCart4 } from "react-icons/bs";
import { BiSolidUserBadge } from "react-icons/bi";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import TodaySaleOverview from "./TodaySaleOverview";
import { useGetOverviewQuery } from "../redux/api/overviewApi";
import { addOverview } from "../redux/services/overviewSlice";

const Home = () => {
  const [show, setShow] = useState("monthly");
  const { liHandler } = useContextCustom();
  const token = Cookies.get("token");
  const { data: overviewData } = useGetOverviewQuery(token);
  const { data } = useGetPhotoQuery(token);
  const oData = useSelector((state) => state?.overviewSlice.oData);

  // console.log("photos", data);
  // console.log("overviewData", overviewData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addPhotos({ photos: data?.data }));
  }, [data]);

  useEffect(() => {
    dispatch(addOverview({ oData: overviewData }));
    // console.log("oData", oData);
  }, [overviewData]);

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" mb-10">
        <p className="breadcrumb-title	">Overview</p>
        <p className=" text-[14px] text-white opacity-70  select-none">
          Overview / Products
        </p>
      </div>
      {/* Breadcrumg end */}

      {/* overview section start */}
      <section className=" flex items-stretch gap-5 mb-10">
        <div className=" basis-3/5 flex items-stretch gap-5">
          <div className="basis-1/2 border-[1px] border-[var(--border-color)] flex justify-center items-center gap-8 rounded-[3px]">
            <div className=" w-[100px] h-[100px] rounded-full bg-zinc-700 flex justify-center items-center">
              <div className=" w-[70px] h-[70px] rounded-full border border-[var(--font-color)]  bg-[var(--border-color)] flex justify-center items-center">
                <BsCart4
                  size={"1.5rem"}
                  className=" text-[var(--font-color)]"
                />
              </div>
            </div>
            <div>
              <p className=" font-semibold text-[26px] text-[var(--secondary-color)] mb-3">
                {oData?.total_stocks} k
              </p>
              <p className=" font-medium text-[14px] text-[var(--secondary-color)]">
                Total Stocks
              </p>
            </div>
          </div>
          <div className="basis-1/2 border-[1px] border-[var(--border-color)] flex justify-center items-center gap-8 rounded-[3px]">
            <div className=" w-[100px] h-[100px] rounded-full bg-zinc-700 flex justify-center items-center">
              <div className=" w-[70px] h-[70px] rounded-full border border-[var(--font-color)]  bg-[var(--border-color)] flex justify-center items-center">
                <BiSolidUserBadge
                  size={"1.5rem"}
                  className=" text-[var(--font-color)]"
                />
              </div>
            </div>
            <div>
              <p className=" font-semibold text-[26px] text-[var(--secondary-color)] mb-3">
                {oData?.total_staff}
              </p>
              <p className=" font-medium text-[14px] text-[var(--secondary-color)]">
                Total Staffs
              </p>
            </div>
          </div>
        </div>
        <div className=" basis-2/5 border-[1px] border-[var(--border-color)] p-5 rounded-[3px]">
          <p className="text-[18px] font-semibold text-[var(--secondary-color)] mb-4">
            Quick Actions
          </p>
          <div className=" flex items-stretch justify-between gap-10">
            <Link to={"/add-product"}>
              <div
                onClick={() => liHandler("add product")}
                className="basis-2/5 border-[1px] border-[var(--border-color)] flex items-center gap-5 p-5 rounded-[3px]"
              >
                <AiOutlinePlus
                  className=" w-12 h-12 p-2 border-[1px] border-[var(--border-color)] flex justify-center items-center text-[var(--font-color)] rounded-[5px]"
                  size={"0.8rem"}
                />
                <div>
                  <p className="font-semibold text-[14px] text-[var(--secondary-color)]">
                    Add Product
                  </p>
                  <p className="font-normal text-[12px] text-[var(--gray-color)]">
                    stock update
                  </p>
                </div>
              </div>
            </Link>
            <Link to={"/cashier"}>
              <div className="basis-3/5 border-[1px] border-[var(--border-color)] flex items-center gap-5 p-5 rounded-[3px]">
                <BsShop
                  className=" w-12 h-12 p-2 border-[1px] border-[var(--border-color)] flex justify-center items-center text-[var(--font-color)] rounded-[5px]"
                  size={"0.5rem"}
                />
                <div>
                  <p className="font-semibold text-[14px] text-[var(--secondary-color)]">
                    Go to Shop{" "}
                  </p>
                  <p className="font-normal text-[12px] text-[var(--gray-color)]">
                    complete the sale
                  </p>
                </div>
                <button className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer ms-auto me-6">
                  <BsArrowRight
                    size={"1rem"}
                    className="text-[var(--secondary-color)]"
                  />
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* overview section end */}
      <section className=" flex items-stretch gap-5 p-5 border-[1px] border-[var(--border-color)]">
        <div className=" basis-2/3 ">
          {/* Breadcrumb start */}
          <div className="flex justify-between items-center  mb-10 rounded-[3px]">
            <p className="breadcrumb-title w-fit">Monthly Sales</p>

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
          {/* Breadcrumgbend */}
          <SaleLineChart oData={oData} tag={show} />
        </div>
        <div className=" basis-1/3 px-5">
          <p className=" text-[24px] text-[var(--secondary-color)] mb-3">
            982.85 k
          </p>
          <p className=" text-[14px] text-[var(--gray-color)] mb-5">kyats</p>
          <div className="flex items-center gap-5 mb-4">
            <LiaMoneyBillWaveAltSolid
              className=" w-12 h-12 p-2 border-[1px] border-[var(--border-color)] flex justify-center items-center text-green-500 rounded-[5px]"
              size={"0.8rem"}
            />
            <div>
              <p className="font-normal text-[16px] text-[var(--secondary-color)]">
                45,675,20
              </p>
              <p className="font-normal text-[12px] text-[var(--gray-color)]">
                Total Profit
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 mb-4">
            <RiMoneyDollarBoxLine
              className=" w-12 h-12 p-2 border-[1px] border-[var(--border-color)] flex justify-center items-center text-[var(--font-color)] rounded-[5px]"
              size={"0.8rem"}
            />
            <div>
              <p className="font-normal text-[16px] text-[var(--secondary-color)]">
                42,456,20
              </p>
              <p className="font-normal text-[12px] text-[var(--gray-color)]">
                Total Income
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 mb-5">
            <BiMoneyWithdraw
              className=" w-12 h-12 p-2 border-[1px] border-[var(--border-color)] flex justify-center items-center text-red-500 rounded-[5px]"
              size={"0.8rem"}
            />
            <div>
              <p className="font-normal text-[16px] text-[var(--secondary-color)]">
                5,675,20
              </p>
              <p className="font-normal text-[12px] text-[var(--gray-color)]">
                Total Expense
              </p>
            </div>
          </div>

          <Link to={"/report-sale"}>
            <button
              onClick={() => liHandler("sale")}
              className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn mb-5"
            >
              Sale Report
            </button>
          </Link>
        </div>
      </section>
      <TodaySaleOverview />
    </div>
  );
};

export default Home;
