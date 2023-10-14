import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import Cookies from "js-cookie";

const Custom = () => {
  const token = Cookies.get("token");
  const { liHandler } = useContextCustom();
  const [sortValue, setSortValue] = useState();
  const [startDate, setStartDate] = useState();
  const [startDateTag, setStartDateTag] = useState(null);
  const [endDateTag, setEndDateTag] = useState(null);
  const [endDate, setEndDate] = useState();
  const [cRecords, setCRecords] = useState();
  const [cPage, setCPage] = useState();
  const [exportValue, setExportValue] = useState();

  useEffect(() => {
    const a = startDate?.toISOString().slice(0, 10);
    const b = endDate?.toISOString().slice(0, 10);
    setStartDateTag(a);
    setEndDateTag(b);
    //console.log("start", startDateTag, endDateTag);
  }, [startDate, endDate]);

  const fetchData = async () => {
    const data = await axios({
      method: "get",
      url: `https://h.mmsdev.site/api/v1/custom_sale_records?start_date=${startDateTag}&end_date=${endDateTag}&page=1`,
      headers: { authorization: `Bearer ${token}` },
      responseType: "finance",
    });
    const cdata = await JSON.parse(data?.data);
    setCRecords(cdata?.data);
    setCPage(cdata);
    // setStartDate(null);
    // setEndDate(null);
    // console.log("data", cdata);
    // console.log("dd", cRecords);
  };

  const pageChange = async(link) => {
    const { data } = await axios({
      method: "get",
      url: `${link}`,
      headers: { authorization: `Bearer ${token}` },
      responseType: "finance",
    });
    const cdata = await JSON.parse(data);
    setCRecords(cdata?.data);
    setCPage(cdata);
  };

  const next=()=>{
    if(cPage?.links?.next){
      pageChange(cPage?.links?.next)
    }
  }
  const prev=()=>{
    if(cPage?.links?.prev){
      pageChange(cPage?.links?.prev)
    }
  }

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-10">
        <div>
          <p className="breadcrumb-title	">Custom</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Finance / Custom
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
          {startDateTag && endDateTag
            ? `From ${startDateTag} to ${endDateTag}`
            : ""}{" "}
          Sale Overview
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
          <div className=" flex justify-start items-baseline gap-2">
            <DateInput
              valueFormat="YYYY-MM-DD"
              label="choose Date"
              placeholder="Date"
              value={startDate}
              onChange={setStartDate}
              maw={400}
              mx="auto"
              className="w-[120px] border-[var(--border-color)] text-[var(--secondary-color)] mx-0"
            />
            <DateInput
              valueFormat="YYYY-MM-DD"
              label="ch0ose Date"
              placeholder="Date"
              value={endDate}
              onChange={setEndDate}
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
          {cRecords?.length > 0 ? (
            cRecords?.map((record, index) => {
              return (
                <tr key={record?.id} className=" ">
                  <td className="px-1 text-center  py-4">{index + 1}</td>
                  <td className="px-1 text-end py-4">{record?.voucher}</td>
                  <td className="px-1 text-end py-4">{record?.cash}</td>
                  <td className="px-1 py-4 text-end">{record?.tax}</td>
                  <td className="px-1 py-4 text-end">{record?.total}</td>
                  <td className="px-1 py-4 text-end"></td>
                  <td className=" px-1 py-4 text-end">{record?.time}</td>
              
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="px-1 text-center py-4 " colSpan={7}>
                There is no data now.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* showList end */}

      <div className="w-full flex justify-between items-end h-[60px] gap-5">
        {/* total calculate start*/}
        {/* <div className=" flex justify-start items-center basis-2/3">
          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total Voucher
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              20
            </p>
          </div>

          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total Cash
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              3,000,000
            </p>
          </div>
          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total Tax
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              100,000
            </p>
          </div>
          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              3,100,000
            </p>
          </div>
        </div> */}
        {/* total calculate end*/}

        {/* pagination start*/}
        <div className="ms-auto"

        >
          <Button.Group className=" pt-10 flex justify-end">
            <Button
              onClick={prev}
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
              page {cPage?.meta?.current_page} / {cPage?.meta?.last_page}
            </Button>

            <Button
              onClick={next
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

export default Custom;
