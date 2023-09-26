import { BiMinus } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";

import { Button } from "@mantine/core";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  useGetBrandsPerPageQuery,
  useGetBrandsQuery,
} from "../../redux/api/brandApi";
import { addBrands } from "../../redux/services/brandSlice";
import { useContextCustom } from "../../context/stateContext";
import axios from "axios";
import BrandAdd from "./BrandAdd";

const Brand = () => {
  // const { showBrandAdd, setShowBrandAdd } = useContextCustom();
  // const [prev, setPrev] = useState();
  // const [next, setNext] = useState();

  // const [brandPageData, setBrandPageData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { data } = useGetBrandsPerPageQuery({currentPage,token});
  // const { data } = useGetBrandsPerPageQuery({currentPage,token});

  const userID = useSelector((state) => state.authSlice.user);
  // const bbrands = useSelector((state) => state.brandSlice.brands);

  console.log("userID", userID);
  // console.log("bbrands", bbrands);
  console.log("data", data);

  useEffect(() => {
    // dispatch(addBrands({ brands: brands?.data }));
    // console.log("data", data);
    console.log("brands", data);
  }, [data]);

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20 relative">
      <div className=" flex justify-between items-center mb-5">
        <div>
          <p className="breadcrumb-title	">Manage Brand</p>
          <p className=" text-[14px] text-white opacity-70 select-none">
            Inventory / Manage Brand
          </p>
        </div>

        <button
          onClick={() => setShowBrandAdd(true)}
          className="w-[170px] h-[40px] font-semibold text-[16px] myBlueBtn flex items-center justify-center gap-2"
        >
          <BsPlusLg size={"1.3rem"} />
          Add Brand
        </button>
      </div>
      {/* <Breadcrumb breadcrumbItems={breadcrumbItems} /> */}
      <p className="breadcrumb-title mb-5">Brands Overview</p>

      <div className=" flex justify-between items-center mb-[30px]">
        <div className="basis-1/3 h-[34px] border-gray-700 rounded border flex items-center px-2 py-1">
          <BsSearch className=" text-gray-400 me-3" />
          <input
            type="text"
            placeholder="search"
            className=" w-[250px] outline-none bg-transparent text-gray-300 text-sm font-semibold"
          />
        </div>
        <div className=" flex gap-5 items-center">
          <label
            htmlFor=""
            className=" text-[var(--gray-color)] text-[14px] font-normal"
          >
            Sort:
          </label>
          <select
            placeholder="Export"
            name="sort"
            // value={sortValue}
            // onChange={(e) => setSortValue(e.target.value)}
            className="recent-dropdown "
          >
            {/* <option value="" className="hidden">
              Export
            </option> */}
            <option value="last" className="recent-dropdown">
              Last
            </option>
          </select>
          <label
            htmlFor=""
            className=" text-[var(--gray-color)] text-[14px] font-normal"
          >
            Filter:{" "}
          </label>
          <select
            placeholder="Export"
            name="sort"
            // value={sortValue}
            // onChange={(e) => setSortValue(e.target.value)}
            className="recent-dropdown "
          >
            {/* <option value="" className="hidden">
              Export
            </option> */}
            <option value="all" className="recent-dropdown">
              All Files
            </option>
          </select>
        </div>
      </div>
      <div>
        {/* brand table start */}
        <table className=" w-full text-gray-200 border border-gray-700 text-sm ">
          <thead>
            <tr className=" border-b border-b-gray-700">
              <th className=" py-4 text-center px-1 uppercase font-medium">
                No
              </th>
              <th className=" py-4 text-end px-1 uppercase font-medium">
                Brand Name
              </th>
              <th className=" py-4 text-end px-1 uppercase font-medium">
                Company Name
              </th>
              <th className=" py-4 text-end px-1 uppercase font-medium">
                Agent
              </th>
              <th className=" py-4 pe-4 text-end px-1 uppercase font-medium">
                Phone
              </th>
              <th className=" py-4 pe-4 text-end px-1 uppercase font-medium">
                Description
              </th>
              <th className=" py-4 pe-4 text-end px-1 uppercase font-medium"></th>
            </tr>
          </thead>
          <tbody className=" text-gray-100"></tbody>
        </table>
        {/* brand table end */}
      </div>

      {/* pagination start*/}
      {/* <div>
        <Button.Group className="  pt-20 flex justify-end">
          <Button
            onClick={() => fetchData(prev)}
            variant="default"
            className={`
                 text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent`}
          >
            <MdArrowBackIosNew />
          </Button>
          {data?.meta?.links?.map((link) => {
            return (
              <Button
                key={link?.label}
                onClick={() => fetchData(link?.url)}
                variant="default"
                className={`${link?.label == "Next &raquo;" ? "hidden" : ""} ${
                  link?.label == "&laquo; Previous" ? "hidden" : ""
                }
                 text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent`}
              >
                {link?.label !== "Next &raquo;" &&
                link?.label !== "&laquo; Previous"
                  ? link?.label
                  : ""}
              </Button>
            );
          })}
          <Button
            onClick={() => fetchData(next)}
            variant="default"
            className={`
                 text-[--secondary-color] hover:text-[--font-color] hover:bg-transparent`}
          >
            <MdArrowForwardIos />
          </Button>
        </Button.Group>
      </div> */}
      {/* pagination end*/}

      {/* add brand start */}
      <BrandAdd />
      {/* add brand end */}
    </div>
  );
};

export default Brand;
