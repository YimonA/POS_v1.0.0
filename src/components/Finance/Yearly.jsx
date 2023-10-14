import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { Button } from "@mantine/core";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
// import url from "./table2excel.js";
const Table2Excel = window.Table2Excel;
import { jsPDF } from "jspdf";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";

const Yearly = () => {
  const token = Cookies.get("token");
  const { liHandler } = useContextCustom();
  const [year, setYear] = useState(null);
  const [allYear, setAllYear] = useState();
  // const [year, setYear] = useState(new Date().getFullYear());
  const [yRecords, setYRecords] = useState();
  const [yearTag, setYearTag] = useState(null);
  const [exportValue, setExportValue] = useState();

  useEffect(() => {
    fetchYearData();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "table2excel.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchData = async (year) => {
    const { data } = await axios({
      method: "get",
      url: `https://h.mmsdev.site/api/v1/yearly_sale_record?year=${year}&page=1`,
      headers: { authorization: `Bearer ${token}` },
      responseType: "financeData",
    });
    const ydata = JSON.parse(data);
    setYRecords(ydata);
    setYearTag(ydata.yearly_sale_overviews[0].year);
  };

  const fetchYearData = async () => {
    const { data } = await axios({
      method: "get",
      url: `https://h.mmsdev.site/api/v1/year`,
      headers: { authorization: `Bearer ${token}` },
      responseType: "getYear",
    });
    const ydata = JSON.parse(data);
    setAllYear(ydata);
  };

  const pageChange = async (link) => {
    const { data } = await axios({
      method: "get",
      url: link,
      headers: { authorization: `Bearer ${token}` },
      responseType: "finance",
    });
    // const dd=await data.json();
    const ydata = JSON.parse(data);
    setYRecords(ydata);
    setYearTag(ydata.yearly_sale_overviews[0].year);
  };

  const next = () => {
    if (yRecords?.next_page_url) {
      pageChange(yRecords?.next_page_url);
    }
  };
  const prev = () => {
    if (yRecords?.prev_page_url) {
      pageChange(yRecords?.prev_page_url);
    }
  };

  const exporExceltHandler = () => {
    var table2excel = new Table2Excel();
    table2excel.export(document.querySelectorAll("#daily-table"));
  };

  const exportHandler = (value) => {
    setExportValue(value);
    console.log("ev", exportValue);
    if (exportValue === "Excel") {
      exporExceltHandler();
    } else if (exportValue === "print") {
      window.print();
    } else if (exportValue === "PDF") {
      exportPDF();
    }
  };

  const exportPDF = () => {
    const pdfObject = jsPDFInvoiceTemplate(props);
    // var pdfObject = jsPDFInvoiceTemplate.default(props); //returns number of pages created
    console.log("pdfObject", pdfObject);
    var props = {
      // outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "Invoice 2021",
      orientationLandscape: false,
      compress: true,
      logo: {
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
        type: "PNG", //optional, when src= data:uri (nodejs case)
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
          top: 0, //negative or positive num, from the current position
          left: 0, //negative or positive num, from the current position
        },
      },
      stamp: {
        inAllPages: true, //by default = false, just in the last page
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        type: "JPG", //optional, when src= data:uri (nodejs case)
        width: 20, //aspect ratio = width/height
        height: 20,
        margin: {
          top: 0, //negative or positive num, from the current position
          left: 0, //negative or positive num, from the current position
        },
      },
      business: {
        name: "MMS",
        address: "Albania, Tirane ish-Dogana, Durres 2001",
        phone: "(+355) 069 11 11 111",
        email: "email@example.com",
        email_1: "info@example.al",
        website: "www.example.al",
      },
      contact: {
        label: "Invoice issued for:",
        name: "Moe Moe",
        address: "Albania, Tirane, Astir",
        phone: "(+355) 069 22 22 222",
        email: "moemoe@website.al",
        otherInfo: "www.website.al",
      },
      invoice: {
        label: "Invoice #: ",
        num: 19,
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "#",
            style: {
              width: 10,
            },
          },
          {
            title: "Title",
            style: {
              width: 30,
            },
          },
          {
            title: "Description",
            style: {
              width: 80,
            },
          },
          { title: "Price" },
          { title: "Quantity" },
          { title: "Unit" },
          { title: "Total" },
        ],
        table: Array.from(
          Array(yRecords?.yearly_sale_overviews?.data.length),
          (item, index) => [
            index + 1,
            "There are many variations ",
            "Lorem Ipsum is simply dummy text dummy text ",
            200.5,
            4.5,
            "m2",
            400.5,
          ]
        ),
        additionalRows: [
          {
            col1: "Total:",
            col2: "145,250.50",
            col3: "ALL",
            style: {
              fontSize: 14, //optional, default 12
            },
          },
          {
            col1: "VAT:",
            col2: "20",
            col3: "%",
            style: {
              fontSize: 10, //optional, default 12
            },
          },
          {
            col1: "SubTotal:",
            col2: "116,199.90",
            col3: "ALL",
            style: {
              fontSize: 10, //optional, default 12
            },
          },
        ],
        invDescLabel: "Invoice Note",
        invDesc:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
      },
      footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
      },
    };
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
            {/* <button
              onClick={exportHandler}
              className="w-[100px] h-[30px] font-semibold text-[16px] myBlueBtn flex justify-center items-center"
            >
              Export
            </button>
            <select
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
          </div>
          <div className=" flex justify-start items-baseline gap-2">
            <select
              name="sort"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="recent-dropdown "
            >
              <option value="null" className="recent-dropdown hidden">
                Year
              </option>

              {allYear?.map((y) => {
                return (
                  <option key={y} value={y} className="recent-dropdown">
                    {y}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            onClick={() => fetchData(year)}
            className="w-[40px] h-[30px] font-semibold text-[16px] myBlueBtn flex justify-center items-center"
          >
            <BsSearch className=" text-[var(--sidebar-color)]" />
          </button>
        </div>
      </div>
      {/* showList start */}
      <table className="w-full text-gray-300 border border-gray-700 text-sm mb-20 daily-table">
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
          </tr>
        </thead>

        <tbody>
          {yRecords?.yearly_sale_overviews?.data.length > 0 ? (
            yRecords?.yearly_sale_overviews?.data?.map((record, index) => {
              return (
                <tr key={record?.id} className=" ">
                  <td className="px-1 text-center  py-4">{index + 1}</td>
                  <td className="px-1 text-end py-4">
                    {record?.total_vouchers}
                  </td>
                  <td className="px-1 text-end py-4">{record?.total_cash}</td>
                  <td className="px-1 py-4 text-end">{record?.total_tax}</td>
                  <td className="px-1 py-4 text-end">{record?.total}</td>
                  <td className="px-1 py-4 text-end">{record?.month}</td>
                  <td className=" px-1 py-4 text-end">{record?.year}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="px-1 text-center py-4 " colSpan={8}>
                There is no data now.
              </td>
            </tr>
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
              {yRecords?.yearly_total_sale_overview?.total_tax?Math.round(yRecords?.yearly_total_sale_overview?.total_tax):null}
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

        {/* pagination start*/}
        <div>
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
              page {yRecords?.yearly_sale_overviews?.current_page} /{" "}
              {yRecords?.yearly_sale_overviews?.last_page}
            </Button>

            <Button
              onClick={next}
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

export default Yearly;
