import { BsArrowRight } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useGetStocksQuery } from "../../redux/api/stockApi";
import { addStocks } from "../../redux/services/stockSlice";
import { Button } from "@mantine/core";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useState } from "react";
import { Badge } from "@mantine/core";

const StockOverview = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const token = Cookies.get("token");
  const { data } = useGetStocksQuery({ token, page });
  const stocks = useSelector((state) => state.stockSlice.stocks);
  console.log("data", data);

  useEffect(() => {
    dispatch(addStocks({ stocks: data?.data }));
    console.log("data", data);
    console.log("stocks", stocks);
  }, [data]);

  // const editStockHandler=(stock)=>{
  //   setShowStockAdd(true);
  //   setStockProductID(stock?.id);
  //   setStockUserID(1);

  // }

  return (
    <div>
      <p className="breadcrumb-title mb-5">Stocks Overview</p>

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
      {/* stock table start */}
      <table className=" w-full text-gray-200 border border-gray-700 text-sm ">
        <thead>
          <tr className=" border-b border-b-gray-700">
            <th className=" py-4 text-center px-1 uppercase font-medium">No</th>
            <th className=" py-4 text-end px-1 uppercase font-medium">Name</th>
            <th className=" py-4 text-end px-1 uppercase font-medium">Brand</th>
            <th className=" py-4 text-end px-1 uppercase font-medium">Unit</th>
            <th className=" py-4 pe-4 text-end px-1 uppercase font-medium">
              Sale Price
            </th>
            <th className=" py-4 pe-4 text-end px-1 uppercase font-medium">
              Total Stock
            </th>
            <th className=" py-4 pe-4 text-end px-1 uppercase font-medium">
              Stock Level
            </th>
            <th className=" py-4 pe-4 text-end px-1 uppercase font-medium"></th>
          </tr>
        </thead>
        <tbody className=" text-gray-100">
          {stocks?.map((stock, index) => {
            return (
              <tr
                key={stock?.id}
                className=" border-b border-b-gray-700 cursor-pointer"
              >
                <td className="px-1 text-center  py-4">{index + 1}</td>
                <td className="px-1 text-end py-4 ">{stock?.product_name}</td>
                <td className="px-1 text-end py-4">{stock.brand_name}</td>
                <td className="px-1 py-4 text-end">{stock?.unit}</td>
                <td className="px-1 py-4 text-end">{stock?.sale_price}</td>
                <td className="px-1 py-4 text-end">{stock?.total_stock}</td>
                <td className="px-1 py-4 text-end">
                  {stock?.total_stock >= 10 ? (
                    <p className="ms-auto w-32 py-1 text-center rounded-full border border-[#56CA00] text-[#56CA00] bg-[#B4F88A33]">
                      In Stock
                    </p>
                  ) : null}
                  {stock?.total_stock <= 10 && stock?.total_stock > 0 ? (
                    <p className="ms-auto w-32 py-1 text-center rounded-full border border-[#F8CE8A] text-[#F8CE8A] bg-[#7b5c2b33]">
                      Low Stock
                    </p>
                  ) : null}
                  {stock?.total_stock <= 0 ? (
                    <p className="ms-auto w-32 py-1 text-center rounded-full border-2 border-[#fa311f] text-[#fa311f] bg-[#b45c2b40]">
                      Out of Stock
                    </p>
                  ) : null}
                </td>
                <td>
                  <div className="me-20 flex justify-end items-center gap-2 z-20">
                    <Link to={`/stock-add/${stock?.id}`}>
                      <button className="inline-block bg-gray-700 w-8 h-8 p-1 rounded-full cursor-pointer">
                        <BsPlusLg
                          size={"1.3rem"}
                          className="text-[var(--secondary-color)]"
                        />
                      </button>
                    </Link>
                    <Link to={`/stock-detail/${stock?.id}`}>
                      <button className="inline-block bg-gray-700 w-8 h-8 p-2 rounded-full cursor-pointer">
                        <BsArrowRight
                          size={"1rem"}
                          className="text-[var(--secondary-color)]"
                        />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* stock table end */}
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
            page {data?.meta?.current_page} / {data?.meta?.last_page}
          </Button>

          <Button
            onClick={() =>
              setPage(page < data?.meta?.last_page ? page + 1 : page)
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
  );
};

export default StockOverview;
