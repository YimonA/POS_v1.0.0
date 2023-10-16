import { PiPencilSimpleLineBold } from "react-icons/pi";
import { PiStorefrontDuotone } from "react-icons/pi";
import { useContextCustom } from "../../context/stateContext";
import AddProductStepper from "./AddProductStepper";
import { BsArrowRightShort } from "react-icons/bs";
import { useEditProductMutation } from "../../redux/api/productApi";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { editProductBrandID } from "../../redux/services/productSlice";
import { useState } from "react";
import { useEffect } from "react";
import { Loader } from "@mantine/core";

const EditProductInfoPreview = ({ productId }) => {
  const [bName, setBName] = useState();
  const { setShowModal } = useContextCustom();
  const [editProduct,{isLoading}] = useEditProductMutation();
  const token = Cookies.get("token");
  const editProductData = useSelector(
    (state) => state.productSlice.editProduct
  );
  const brands = useSelector((state) => state.logoSlice.brands);

  const editProductHandler = async () => {
    try {
      const res = await editProduct({
        id: productId,
        token,
        product: editProductData,
      });
      // console.log("res", res);
      setShowModal(true);
    } catch (err) {
      console.log("error", err);
    }
  };

  //   const a = () => {
  //     for (let i = 0; i <= brands.length; i++) {
  //       if (brands[i]?.id === editProductData?.brand_id) {
  //         console.log("a", brands[i]?.name);
  //       }
  //     }
  //   };
  // const afind=brands.find(b=>{
  //   return b.id===19
  // })
  // console.log('afind',brands.find(b=>{
  //   return b.id===19
  // }))
  return (
    <div className="flex gap-20 justify-start items-stretch bg-[--base-color]">
      <div className="w-[680px]">
        <div className="px-10 w-[520px] h-fit bg-[var(--sidebar-color)]">
          <div className=" flex justify-between items-center">
            <div className="relative py-10">
              <img
                src={editProductData?.photo}
                className="-mt-[70px] w-[140px] h-[140px] rounded-full  flex justify-center items-center object-cover object-center"
              />
              <div className="absolute bottom-[40px] right-3 w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
                <PiPencilSimpleLineBold />
              </div>
            </div>

            <div>
              <h1 className=" text-[26px] text-white font-semibold">
                {editProductData?.name}
              </h1>
              <p className=" text-[14px] font-medium text-[#C5C1C1]">
                Sale price:
                <span className=" text-[var(--secondary-color)]">
                  {editProductData?.sale_price} MMK
                </span>
              </p>
              <p className=" text-[14px] font-medium text-[#C5C1C1]">
                Actual price:
                <span className=" text-[var(--secondary-color)]">
                  {editProductData?.actual_price} MMK
                </span>
              </p>
            </div>
          </div>
          <div className=" border-b-2 border-b-[var(--border-color)] h-[50px] flex justify-start items-center gap-5">
            <PiStorefrontDuotone
              size={"1.8rem"}
              className="text-[var(--font-color)]"
            />
            <p className="text-white text-[16px]">Information</p>
          </div>
          <div className=" flex justify-between items-stretch py-10">
            <div className="w-fit flex flex-col gap-5 basis-1/2">
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Name</p>
              {/* <p className=" font-medium text-[18px] text-[#B9B9B9]">Brand</p> */}
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Stock</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Unit</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">
                More Information
              </p>
            </div>
            <div className="w-fit flex flex-col gap-5 basis-1/2 ps-10">
              <p className=" font-medium text-[18px] text-white">
                : {editProductData?.name}
              </p>
              {/* <p className=" font-medium text-[18px] text-white">
                : 
                {editProductData?.brand_id}
              </p> */}
              <p className=" font-medium text-[18px] text-white">
                : {editProductData?.total_stock}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {editProductData?.unit}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {editProductData?.more_information}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper start */}

      <div className="w-[150px] h-[460px] flex flex-col justify-between items-center">
        <AddProductStepper />
        <button
          onClick={editProductHandler}
          className="w-[140px] h-[40px] myBlueBtn font-medium text-[14px] flex justify-center items-center gap-2"
        >
{isLoading ? (
            <div className=" flex justify-center items-center gap-2">
              <Loader color="white" size="xs" />
              <span>Loading....</span>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1">
              <span>Edit</span> <BsArrowRightShort size={"1.5rem"} />
            </div>
          )}        </button>
      </div>

      {/* Stepper end */}
    </div>
  );
};

export default EditProductInfoPreview;
