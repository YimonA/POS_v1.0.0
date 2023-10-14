import { PiStorefrontDuotone } from "react-icons/pi";
import { BsArrowRightShort } from "react-icons/bs";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import { useGetSingleStocksQuery } from "../../redux/api/stockApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleStock } from "../../redux/services/stockSlice";
import { useGetSinglBrandQuery } from "../../redux/api/logoApi";
import { addSingleBrand } from "../../redux/services/logoSlice";

const BrandDetail = () => {
  const [singleBrand, setSingleBrand] = useState();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data } = useGetSinglBrandQuery({ id, token });
  const singleData = useSelector((state) => state.logoSlice.singleBrand);

  useEffect(() => {
    dispatch(addSingleBrand(data?.data));
  }, [data]);

  useEffect(() => {
    setSingleBrand(singleData);
    // console.log("singleBrand", singleBrand);
  }, [singleData]);

  return (
    <div className="w-full p-5 bg-[--base-color]">
      <div className=" mb-5 flex justify-between items-center">
        <div >
        <p className="breadcrumb-title	">Manage Brand</p>
        <p className=" text-[14px] text-white opacity-70  select-none">
          Inventory / Manage Brand / Brand Information
        </p></div>
        <Link to={'/brand'}>
        <button className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn">
          Brand List
        </button></Link>
      </div>

      <div className="px-10 py-5 w-[680px] h-fit bg-[var(--sidebar-color)]">
        <div className=" border-b-2 border-b-[var(--border-color)] h-[50px] flex justify-start items-center gap-2 pb-4">
          <PiStorefrontDuotone
            size={"1.8rem"}
            className="text-[var(--font-color)]"
          />
          <p className="font-semibold	text-[18px] text-white  select-none">
            Brand Information
          </p>
        </div>
        <div className=" flex justify-start items-start py-10">
          <div className="w-fit flex flex-col gap-5 basis-1/2">
            <p className=" font-medium text-[18px] text-[#B9B9B9]">Brand</p>
            <p className=" font-medium text-[18px] text-[#B9B9B9]">Company</p>
            <p className=" font-medium text-[18px] text-[#B9B9B9]">Agent</p>
            <p className=" font-medium text-[18px] text-[#B9B9B9]">Phone</p>
            <p className=" font-medium text-[18px] text-[#B9B9B9]">Products</p>
            <p className=" font-medium text-[18px] text-[#B9B9B9]">
              More Information
            </p>
          </div>
          <div className="w-fit flex flex-col gap-5 basis-1/2 ps-10">
            <p className=" font-medium text-[18px] text-white">
              : {singleBrand?.name}
            </p>
            <p className=" font-medium text-[18px] text-white">
              : {singleBrand?.company}
            </p>
            <p className=" font-medium text-[18px] text-white">
              : {singleBrand?.agent}
            </p>
            <p className=" font-medium text-[18px] text-white">
              : {singleBrand?.phone_no}
            </p>
            <p className=" font-medium text-[18px] text-white">
              :
              {singleBrand?.products?.map((p) => {
                return <span key={p}>{p?.name}</span>;
              })}
            </p>
            <p className=" font-medium text-[18px] text-white">
              : {singleBrand?.description}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default BrandDetail;
