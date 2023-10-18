// import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { DateInput } from "@mantine/dates";
import Cookies from "js-cookie";
import axios from "axios";

const Daily = () => {
  const [page, setPage] = useState(1);
  const { liHandler } = useContextCustom();
  const token = Cookies.get("token");
  const [dRecords, setDRecords] = useState(null);
  const [date, setDate] = useState(null);
  const [dateTag, setDateTag] = useState(null);
  // const [exportValue, setExportValue] = useState();

  useEffect(() => {
    const a = date?.toLocaleDateString("es-CL");
    //console.log('date',date.toLocaleDateString("es-CL"))
    setDateTag(a);
  }, [date]);

  const fetchData = async () => {
    const {data} = await axios({
      method: "get",
      url: `https://h.mmsdev.site/api/v1/daily_sale_records?date=${dateTag}&page=${page}`,
      headers: { authorization: `Bearer ${token}` },
      responseType: "finance-daily",
    });
    const dData = await JSON.parse(data);
    setDRecords(dData);
    setDate(null);
    //console.log("data", data);
    console.log("dd", dData);
  };

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-10">
        <div>
          <p className="breadcrumb-title	">Daily</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Finance / Daily
          </p>{" "}
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
          {dateTag ? dateTag : "Today"} Sale Overview
        </p>
        <div className=" flex items-baseline gap-4">
          {/* <select
            placeholder="Export"
            name="sort"
            value={exportValue}
            onChange={(e) => setExportValue(e.target.value)}
            className="recent-dropdown "
          >
            <option value="" className="recent-dropdown hidden">
              Export
            </option>
            <option value="PDF" className="recent-dropdown">
              PDF
            </option>
            <option value="print" className="recent-dropdown">
              Print
            </option>
            <option value="Excel" className="recent-dropdown">
              Excel
            </option>
          </select> */}

          <div>
            <DateInput
              valueFormat="DD-MM-YYYY"
              label="choose Date"
              placeholder="Date"
              value={date}
              onChange={setDate}
              maw={400}
              mx="auto"
              className="w-[120px] border-[var(--border-color)] text-[var(--secondary-color)] mx-0"
            />
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
              DATE
            </th>
            <th className=" py-4 border-b text-end border-gray-600 px-1 uppercase font-medium">
              TIME
            </th>
          </tr>
        </thead>
        <tbody>
          {dRecords === null || dRecords?.total_vouchers == 0 ? (
            <tr>
              <td className="px-1 text-center py-4 " colSpan={7}>
                There is no data now.
              </td>
            </tr>
          ) : (
            dRecords?.data?.map((dRecord, index) => {
              return (
                <tr key={dRecord?.id}>
                  <td className="px-1 text-center  py-4">{index+1}</td>
                  <td className="px-1 text-end py-4">{dRecord?.voucher_number}</td>
                  <td className="px-1 text-end py-4">{dRecord?.cash}</td>
                  <td className="px-1 py-4 text-end">{dRecord?.tax}</td>
                  <td className="px-1 py-4 text-end">{dRecord?.total}</td>
                  <td className="px-1 py-4 text-end">{dRecord?.created_at}</td>
                  <td className=" px-1 py-4 text-end">{dRecord?.time}</td>
                </tr>
              );
            })
          )}
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
              Total Voucher
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {dRecords?.data? dRecords.data.length: ''}
            </p>
          </div>

          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total Cash
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {dRecords?.total?.total_cash}
            </p>
          </div>
          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total Tax
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {dRecords?.total?.total_tax}
            </p>
          </div>
          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {dRecords?.total?.total}
            </p>
          </div>
        </div>
        {/* total calculate end*/}

        {/* pagination start*/}
        <div>
          <Button.Group className=" pt-10 flex justify-end">
            <Button
              onClick={() => setPage(page > 1 ? page - 1 : page)}
              variant="default"
              className={`
                 text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent`}
            >
              <MdArrowBackIosNew />
            </Button>
            <Button
              variant="default"
              className={`text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent`}
            >
              page {dRecords?.meta?.current_page} /{" "}
              {dRecords?.meta?.last_page}
            </Button>

            <Button
              onClick={() =>
                setPage(
                  page < dRecords?.daily_sale_records?.last_page
                    ? page + 1
                    : page
                )
              }
              variant="default"
              className={`
                 text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent`}
            >
              <MdArrowForwardIos />
            </Button>
          </Button.Group>
        </div>
        {/* pagination end*/}
      </div>
    </div>
  );
};

export default Daily;
