import { useContextCustom } from "../../context/stateContext";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import {
  useAddStockMutation,
  useGetSingleStocksQuery,
} from "../../redux/api/stockApi";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const StockEdit = () => {
  const [qty, setQty] = useState();
  const [more, setMore] = useState();

  const token = Cookies.get("token");
  const { id } = useParams();
  const { data } = useGetSingleStocksQuery({ id, token });

  const userID = useSelector((state) => state.authSlice.user.id);
  console.log("id", userID);
  const nav = useNavigate();
  const [addStock] = useAddStockMutation();

  useEffect(() => {
    setQty(data?.data?.total_stock);
    setMore(data?.data?.more);
    console.log("stockData", qty, more);
  }, [data]);

  const AddStockHandler = (e) => {
    e.preventDefault();
    const newData = { user_id: userID, product_id: 20, qty, more };
    console.log("newData", newData);
    addStock(newData);
    nav("/stock-control");
  };

  return (
    <div
      className={`w-full h-full bg-[var(--base-color)] p-5 z-20 top-0 border-[3px] border-[var(--border-color)] flex flex-col justify-between `}
    >
      <div>
        <p className="flex justify-between items-center text-white text-[18px] font-normal mb-3 gap-3">
          Add Stock
          <AiOutlineClose
            onClick={() => setShowStockAdd(false)}
            className=" text-white"
          />
        </p>
        <form onSubmit={AddStockHandler} className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            Quantity
          </label>
          <input
            type="text"
            defaultValue={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-[100%] h-[30px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />

          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            More
          </label>
          <textarea
            defaultValue={more}
            onChange={(e) => setMore(e.target.value)}
            className="w-[100%] h-[60px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
          <button className="w-full h-[35px] font-normal text-[14px] myBlueBtn mt-6">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default StockEdit;
