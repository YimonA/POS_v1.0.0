import { PiStorefrontDuotone } from "react-icons/pi";
import { BsArrowRightShort } from "react-icons/bs";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import { useGetSingleStocksQuery } from "../../redux/api/stockApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleStock } from "../../redux/services/stockSlice";

const StockDetail = () => {
  const [singleStock, setSingleStock] = useState();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data } = useGetSingleStocksQuery({ id, token });
  const singleData = useSelector((state) => state.stockSlice.singleStock);
  // console.log("singleData", singleData);

  useEffect(() => {
    dispatch(addSingleStock(data?.data));
  }, [data]);

  useEffect(() => {
    setSingleStock(singleData);
    // console.log("singleStock", singleStock);
  }, [singleData]);

  return (
    <div className="w-full p-5 bg-[--base-color]">
        <div className="p-10 w-[680px] h-fit bg-[var(--sidebar-color)] pb-10">
          <div className=" border-b-2 border-b-[var(--border-color)] h-[50px] flex justify-start items-center gap-2">
            <PiStorefrontDuotone
              size={"1.8rem"}
              className="text-[var(--font-color)]"
            />
            <p className="font-semibold	text-[18px] text-white  select-none">Stock Information</p>
          </div>
          <div className=" flex justify-start items-start py-10">
            <div className="w-fit flex flex-col gap-5 basis-1/2">
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Brand</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">
                Created By
              </p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">
                Sale Price
              </p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">
                Total Stock
              </p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Unit</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">
                More Information
              </p>
            </div>
            <div className="w-fit flex flex-col gap-5 basis-1/2 ps-10">
              <p className=" font-medium text-[18px] text-white">
                : {singleStock?.sale_price}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {singleStock?.sale_price}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {singleStock?.sale_price}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {singleStock?.total_stock}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {singleStock?.unit}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {singleStock?.more}
              </p>
            </div>
          </div>
          <Link to={"/stock-control"}>
          <button className="w-[110px] h-[40px] myBlueBtn font-medium text-[14px] flex justify-center items-center gap-2 ms-auto ">
            Back <BsArrowRightShort size={"1.5rem"} />
          </button>
        </Link>
        </div>
        
        
    </div>
  );
};

export default StockDetail;
