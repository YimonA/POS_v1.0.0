import React from "react";
import { BsListUl } from "react-icons/bs";
import { PiGridFour } from "react-icons/pi";
import { useEffect, useState } from "react";
import ProductsTable from "./ProductsTable";
import ProductsGrid from "./ProductsGrid";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useGetProductsQuery } from "../../redux/api/productApi";
import { addProducts, setSearchTerm } from "../../redux/services/productSlice";

const Products = () => {
  const [sortValue,setSortValue]=useState('high-price')
  const [btnTableIsActive, setBtnTableIsActive] = useState(true);
  const { liHandler } = useContextCustom();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { data } = useGetProductsQuery(token);
  const products = useSelector((state) => state.productSlice.products);
  const searchTerm = useSelector((state) => state.productSlice.searchTerm);

  useEffect(() => {
    dispatch(addProducts({products: data?.data}));
  }, [data]);

  const rows = products
    ?.filter((item) => {
      if (searchTerm === "") {
        return item;
      } else if (
        item?.name.toLowerCase().includes(searchTerm?.toLocaleLowerCase())
      ) {
        return products;
      }
    });

  return (
    <div className="container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      <div className=" flex justify-between items-center mb-5">
        <div>
          <p className="breadcrumb-title	">Products</p>
          <p className=" text-[14px] text-white opacity-70 select-none">
            Inventory / Products
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
          <Link to={"/add-product"}>
            <button
              onClick={() => liHandler("add product")}
              className="w-[170px] h-[40px] font-semibold text-[16px] myBlueBtn flex items-center justify-center gap-2"
            >
              <BsPlusLg size={"1.3rem"} />
              Add Product
            </button>
          </Link>
        </div>
      </div>
      {/* <Breadcrumb breadcrumbItems={breadcrumbItems} /> */}
      <p className="breadcrumb-title mb-5">Products Overview</p>

      <div className=" flex justify-between items-center mb-[30px]">
        <div className="basis-1/3 h-[34px] border-gray-700 rounded border flex items-center px-2 py-1">
          <BsSearch className=" text-gray-400 me-3" />
          <input
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
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
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            className="recent-dropdown w-32"
          >
            <option value="high-price" className="recent-dropdown">
              high price
            </option>
            <option value="low-price" className="recent-dropdown">
              low price
            </option>
          </select>
          <label
            htmlFor=""
            className=" text-[var(--gray-color)] text-[14px] font-normal"
          >
            Filter:
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
          <div className="btn-border-table-grid  w-[50px] h-[28px] flex ">
            <button
              onClick={() => setBtnTableIsActive(true)}
              className={`${
                btnTableIsActive ? "text-[#8AB4F8]" : "text-[#7E7F80]"
              } basis-1/2 hover:text-[#8AB4F8] border-r-[1px] border-r-[#7E7F80] px-1 `}
            >
              <BsListUl />
            </button>
            <button
              onClick={() => setBtnTableIsActive(false)}
              className={`${
                btnTableIsActive ? "text-[#7E7F80]" : "text-[#8AB4F8]"
              } basis-1/2 text-[#7E7F80] px-1 hover:text-[#8AB4F8] active:text-[#8AB4F8]`}
            >
              <PiGridFour />
            </button>
          </div>{" "}
        </div>
      </div>
      <div>
        {btnTableIsActive ? (
          <ProductsTable
            products={rows} sortV={sortValue}
          />
        ) : (
          <ProductsGrid products={rows} sortV={sortValue}/>
        )}
      </div>

    </div>
  );
};

export default Products;
