import { useContextCustom } from "../context/stateContext";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { BsCalculator } from "react-icons/bs";
import ModalSaleClose from "./ModalSaleClose";
import Modal from "./Modal";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TodaySaleOverview = () => {
  const token = Cookies.get("token");
  const { showModal, setShowModal, sidebarActived } = useContextCustom();
  const [sortValue, setSortValue] = useState();
  const [vouchers, setVouchers] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await axios({
      method: "get",
      url: `https://h.mmsdev.site/api/v1/voucher?page=1`,
      headers: { authorization: `Bearer ${token}` },
      responseType: "sale",
    });
    const voucher = await JSON.parse(data?.data);
    setVouchers(voucher?.data);
  };

  const pageChange = async (link) => {
    const { data } = await axios({
      method: "get",
      url: link,
      headers: { authorization: `Bearer ${token}` },
      responseType: "voucher",
    });
    const voucher = JSON.parse(data);
    setVouchers(voucher?.data);
    // setMonthTag(mdata?.data.monthly_sale_overview[0]?.date);
  };

  const next = () => {
    if (vouchers?.next_page_url) {
      pageChange(vouchers?.next_page_url);
    }
  };
  const prev = () => {
    if (vouchers?.prev_page_url) {
      pageChange(vouchers?.prev_page_url);
    }
  };

  return (
    <div className=" w-full my-10">
      <div className=" flex justify-between items-center py-5">
        <p className="breadcrumb-title	">Today Sale Overview</p>

        <div className=" flex items-baseline gap-4">
          <select
            name="sort"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            className="recent-dropdown w-[100px]"
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

          <button
            onClick={() => setShowModal(true)}
            className={`${
              sidebarActived === "recent" ? "flex" : "hidden"
            } text-[var(--secondary-color)] justify-center items-center border-[var(--border-color)] rounded border px-2 py-1`}
          >
            <BsCalculator className="text-[var(--font-color)] me-2" /> sale
            close
          </button>
          {/* <Select
            defaultValue={"all"}
            className=" recent-dropDrown"
            rightSection={
              <FaAngleDown
                size="1rem"
                className="text-[var(--secondary-color)]"
              />
            }
            rightSectionWidth={30}
            unstyled
            data={[
              { value: "all", label: "All Files" },
              { value: "aa", label: "aa" },
            ]}
          /> */}
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
              SALE PERSON{" "}
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
          {vouchers?.voucher.length > 0 ? (
            vouchers?.voucher.map((v, index) => {
              return (
                <tr key={v?.id} className=" ">
                  <td className="px-1 text-center  py-4">{index + 1}</td>
                  <td className="px-1 text-end py-4">{v?.voucher_number}</td>
                  <td className="px-1 text-end py-4">{v?.sale_person}</td>
                  <td className="px-1 text-end py-4">{v?.cash}</td>
                  <td className="px-1 py-4 text-end">{v?.tax}</td>
                  <td className="px-1 py-4 text-end">{v?.total}</td>
                  <td className="px-1 py-4 text-end">
                    {new Date().toLocaleDateString("mm")}
                  </td>
                  <td className=" px-1 py-4 text-end">{v?.time}</td>
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
              Total Voucher
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {vouchers?.totalVouchers}
            </p>
          </div>

          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total Cash
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {vouchers?.totalCash}
            </p>
          </div>
          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total Tax
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {Math.floor(vouchers?.totalTax)}
            </p>
          </div>
          <div
            className={`text-[var(--secondary-color)] btn-border-table-grid px-5 py-3 flex flex-col justify-end basis-1/4`}
          >
            <p className=" text-[var(--font-color)] text-end text-[14px] font-medium">
              Total
            </p>
            <p className=" text-[var(--secondary-color)] text-end text-[22px] font-semibold">
              {Math.floor(vouchers?.total)}
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
              page {vouchers?.current_page} / {vouchers?.last_page}
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

      {/* show modal start */}

      {showModal ? (
        <Modal title={"Sale Close"} modalView={<ModalSaleClose />} />
      ) : (
        ""
      )}
      {/*  show modal end */}
    </div>
  );
};

export default TodaySaleOverview;
