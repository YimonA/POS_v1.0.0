import { useState } from "react";
import {
  useAddStockMutation,
  useGetSingleStocksQuery,
} from "../../redux/api/stockApi";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContextCustom } from "../../context/stateContext";
import { Loader } from "@mantine/core";
import { useSelector } from "react-redux";

const StockEdit = () => {
  const [qty, setQty] = useState();
  const [more, setMore] = useState();
  const { UID } = useContextCustom();
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data } = useGetSingleStocksQuery({ id, token });

  const nav = useNavigate();
  const [addStock, { isLoading }] = useAddStockMutation();

  useEffect(() => {
    setQty(data?.data?.total_stock);
    setMore(data?.data?.more);
    // console.log("stockData", qty, more);
  }, [data]);

  const AddStockHandler = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        user_id: UID,
        product_id: Number(id),
        quantity: Number(qty),
        more,
      };
      // console.log("newData", newData);
      const response = await addStock({ newData: newData, token });
      // console.log("response", response);
      nav("/stock-control");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div
      className={`w-full h-full bg-[var(--base-color)] p-5 z-20 top-0 border-[3px] border-[var(--border-color)] flex flex-col justify-between `}
    >
      <div className=" mb-5 flex justify-between items-center">
        <div>
          <p className="breadcrumb-title	">Add Stock</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Inventory / Add Stock
          </p>
        </div>
        <Link to={"/stock-control"}>
          <button className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn">
            Stock List
          </button>
        </Link>
      </div>
      <div className="w-[680px] bg-[var(--sidebar-color)] px-10 py-5">
        <form onSubmit={AddStockHandler} className="flex flex-col gap-2 ">
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold mb-3"
          >
            Quantity
          </label>
          <input
            type="text"
            defaultValue={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />

          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold mb-3"
          >
            More
          </label>
          <textarea
            defaultValue={more}
            onChange={(e) => setMore(e.target.value)}
            className="w-full h-[150px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
          <button
            type="submit"
            className="w-[200px] h-[35px] font-normal text-[14px] myBlueBtn my-6 ms-auto"
          >
            {isLoading ? (
              <div className=" flex justify-center items-center gap-2">
                <Loader color="white" size="xs" />
                <span>Loading....</span>
              </div>
            ) : (
              "Add"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StockEdit;
