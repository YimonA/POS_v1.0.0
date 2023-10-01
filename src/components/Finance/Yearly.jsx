import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import { BsSearch } from "react-icons/bs";
import {  useState } from "react";
import { Button } from "@mantine/core";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import Cookies from "js-cookie";
import axios from "axios";

const Yearly = () => {
  const token = Cookies.get("token");
  const { liHandler } = useContextCustom();
  const [sortValue, setSortValue] = useState();
  const [year, setYear] = useState(null);
  const [yRecords, setYRecords] = useState();
  const [yearTag, setYearTag] = useState(null);

  const fetchData = async () => {
    const { data } = await axios({
      method: "get",
      url: `https://h.mmsdev.site/api/v1/yearly_sale_record?year=${year}`,
      headers: { authorization: `Bearer ${token}` },
      responseType: "finance",
    });
    const ydata = JSON.parse(data);
    setYRecords(ydata);
    setYear(null);
    setYearTag(ydata.yearly_sale_overviews[0].year);
    console.log("dd", ydata);
  };

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-10">
        <div>
          <p className="breadcrumb-title	">Yearly</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Finance / Yearly
          </p>
        </div>
        <Link to={"/cashier"}>
          <button
            onClick={() => liHandler("cashier")}
            className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn"
          >
            Go to Shop
          </button>
        </Link>
      </div>
      {/* Breadcrumg end */}

      <div className=" flex justify-between items-center py-5">
        <p className="breadcrumb-title	">
          {yearTag ? yearTag : "Yearly"} Sale Overview
        </p>
        <div className=" flex items-baseline gap-4">
          <div className=" flex justify-start items-baseline gap-2">
            <select
              name="sort"
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              className="recent-dropdown "
            >
              <option value="" className="recent-dropdown hidden">
                Export
              </option>
              <option value="last" className="recent-dropdown">
                PDF
              </option>
              <option value="first" className="recent-dropdown">
                Print
              </option>
              <option value="copy" className="recent-dropdown">
                Copy
              </option>
            </select>
          </div>
          <div className=" flex justify-start items-baseline gap-2">
            <select
              name="sort"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="recent-dropdown "
            >
              <option value="" className="recent-dropdown hidden">
                Year
              </option>
              {/* <option value={2021} className="recent-dropdown">
                2021
              </option>
              <option value={2022} className="recent-dropdown">
                2022
              </option> */}
              <option value={2023} className="recent-dropdown">
                2023
              </option>
            </select>
          </div>

          <button
            onClick={fetchData}
            className="w-[40px] h-[30px] font-semibold text-[16px] myBlueBtn flex justify-center items-center"
          >
            <BsSearch className=" text-[var(--sidebar-color)]" />
          </button>
        </div>
      </div>
      {/* showList start */}
      <table className="w-full text-gray-300 border border-gray-700 text-sm mb-20">
        <thead>
          <tr className="">
            <th className=" py-4 border-b text-center border-gray-600 px-1 uppercase font-medium">
              No
            </th>
            <th className=" py-4 border-b text-end border-gray-600 px-1 uppercase font-medium">
              VOUCHER
            </th>
            <th className=" py-4 border-b text-end border-gray-600 px-1 uppercase font-medium">
              CASH
            </th>
            <th className=" py-4 border-b text-end border-gray-600 px-1 uppercase font-medium">
              TAX
            </th>
            <th className=" py-4 border-b text-end border-gray-600 px-1 uppercase font-medium">
              TOTAL
            </th>
            <th className=" py-4 border-b text-end border-gray-600 px-1 uppercase font-medium">
              Month
            </th>
            <th className=" py-4 border-b text-end border-gray-600 px-1 uppercase font-medium">
              Year
            </th>
            <th className=" "></th>
          </tr>
        </thead>

        <tbody>
          {yRecords?.yearly_sale_overviews.length>0?
          yRecords?.yearly_sale_overviews?.map((record, index) => {
            return (
              <tr key={record?.id} className=" ">
                <td className="px-1 text-center  py-4">{index + 1}</td>
                <td className="px-1 text-end py-4">{record?.total_vouchers}</td>
                <td className="px-1 text-end py-4">{record?.total_cash}</td>
                <td className="px-1 py-4 text-end">{record?.total_tax}</td>
                <td className="px-1 py-4 text-end">{record?.total}</td>
                <td className="px-1 py-4 text-end">{record?.month}</td>
                <td className=" px-1 py-4 text-end">{record?.year}</td>
                <td className=" pe-5 py-4 text-end">
                  <span className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer">
                    <BsArrowRight
                      size={"1rem"}
                      className="text-[var(--secondary-color)]"
                    />
                  </span>
                </td>
              </tr>
            );
          }):
          <tr><td className="px-1 text-center py-4 " colSpan={8} >There is no data now.</td></tr> 
          }
        </tbody>
      </table>
      {/* showList end */}

      <div className="w-full flex justify-between items-end h-[60px] gap-5">
        {/* total calculate start*/}
        <div className=" flex justify-start items-center basis-2/3">
          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total Months
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {yRecords?.yearly_total_sale_overview?.total_month}
            </p>
          </div>
          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total Voucher
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {yRecords?.yearly_total_sale_overview?.total_vouchers}
            </p>
          </div>

          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total Cash
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {yRecords?.yearly_total_sale_overview?.total_cash}
            </p>
          </div>
          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total Tax
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {yRecords?.yearly_total_sale_overview?.total_tax}
            </p>
          </div>
          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {yRecords?.yearly_total_sale_overview?.total}
            </p>
          </div>
        </div>
        {/* total calculate end*/}

        {/* pagination start */}
        <Button.Group className=" border-[--border-color] flex justify-end basis-1/3">
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent"
          >
            <MdArrowBackIosNew />
          </Button>
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent"
          >
            1
          </Button>
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent"
          >
            2
          </Button>
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent"
          >
            3
          </Button>
          <Button
            variant="default"
            className=" text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent"
          >
            <MdArrowForwardIos />
          </Button>
        </Button.Group>
        {/* pagination end */}
      </div>
    </div>
  );
};

export default Yearly;
