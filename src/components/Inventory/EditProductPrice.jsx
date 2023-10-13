import { useEffect, useState } from "react";
import { useContextCustom } from "../../context/stateContext";
import AddProductStepper from "./AddProductStepper";
import { BsArrowRightShort } from "react-icons/bs";

const EditProductPrice = () => {
  const {
    pdata,
    nextStepperHandler,
    editSalePrice,
    setEditSalePrice,
    editActualPrice,
    setEditActualPrice,
  } = useContextCustom();

  useEffect(() => {
    setEditSalePrice(pdata?.sale_price);
    // setEditActualPrice(pdata?.actual_price);
  }, []);

  return (
    <div className="flex gap-20 justify-start items-stretch bg-[--base-color]">
      <div className=" w-[680px] h-fit bg-[var(--sidebar-color)]">
        <form action="" className="px-14 py-10 flex flex-col gap-5">
          {/* <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Actual Price
            </label>
            <input
              type="text"
              value={editActualPrice}
              onChange={(e) => setEditActualPrice(e.target.value)}
              placeholder=""
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div> */}
          <div className=" flex justify-start items-start">
            <label
              htmlFor=""
              className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold"
            >
              Sale Price
            </label>
            <input
              type="text"
              defaultValue={editSalePrice}
              onChange={(e) => setEditSalePrice(e.target.value)}
              placeholder="100000"
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
        </form>
      </div>
      <div className="w-[150px] h-[460px] flex flex-col justify-between items-center">
        <AddProductStepper />
        <button
          onClick={() => nextStepperHandler(4)}
          className="w-[110px] h-[40px] myBlueBtn font-medium text-[14px] flex justify-center items-center gap-2"
        >
          Next <BsArrowRightShort size={"1.5rem"} />
        </button>
      </div>
    </div>
  );
};

export default EditProductPrice;
