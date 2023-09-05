import { PiPencilSimpleLineBold } from "react-icons/pi";
import { PiStorefrontDuotone } from "react-icons/pi";
import { useContextCustom } from "../../context/stateContext";
import CreateUserStepper from "./CreateUserStepper";
import { BsArrowRightShort } from "react-icons/bs";
import { useAddProductMutation } from "../../redux/api/productApi";
import Cookies from "js-cookie";
import { useMemo } from "react";

const CreateUserPreview = () => {
  const {
    productName,
    setProductName,
    brand,
    setBrand,
    unit,
    setUnit,
    productInfo,
    setProductInfo,
    stock,
    setStock,
    actualPrice,
    setActualPrice,
    salePrice,
    setSalePrice,
    photo,
    setPhoto,
    setShowModal,
  } = useContextCustom();
  const [addProduct] = useAddProductMutation();

  const createProductHandler = async () => {
    const token = Cookies.get("token");
    const product = {
      name: productName,
      brand_id: brand,
      unit: unit,
      more_information: productInfo,
      // stock: Number(stock),
      actual_price: Number(actualPrice),
      sale_price: Number(salePrice),
      photo: photo,
    };
    const data = await addProduct({ product, token });
    console.log("dddd", data);
    console.log("pppp", product);

    setShowModal(true);
    // setProductName();
    // setUnit();
    // setBrand();
    // setProductInfo();
    // setStock();
    // setActualPrice();
    // setSalePrice();
    // setPhoto();
  };

  return (
    <div className="flex gap-20 justify-start items-stretch bg-[--base-color]">
      <div className="w-[680px]">
        <div className="px-10 w-[520px] h-fit bg-[var(--sidebar-color)]">
          <div className=" flex justify-between items-center">
            <div className="relative py-10">
              <img
                src={photo}
                className="-mt-[70px] w-[140px] h-[140px] rounded-full  flex justify-center items-center object-cover object-center"
              />
              <div className="absolute bottom-[40px] right-3 w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
                <PiPencilSimpleLineBold />
              </div>
            </div>

            <div>
              <h1 className=" text-[26px] text-white font-semibold">
                {productName}
              </h1>
              <p className=" text-[14px] font-medium text-[#C5C1C1]">
                Sale price:{" "}
                <span className=" text-[var(--secondary-color)]">
                  {salePrice} MMK
                </span>
              </p>
              <p className=" text-[14px] font-medium text-[#C5C1C1]">
                Actual price:{" "}
                <span className=" text-[var(--secondary-color)]">
                  {actualPrice} MMK
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
          <div className=" flex justify-between items-center py-10">
            <div className="w-fit flex flex-col gap-5 basis-1/2">
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Name</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Brand</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Stock</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Unit</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">
                More Information
              </p>
            </div>
            <div className="w-fit flex flex-col gap-5 basis-1/2 ps-10">
              <p className=" font-medium text-[18px] text-white">
                : {productName}
              </p>
              <p className=" font-medium text-[18px] text-white">: {brand}</p>
              <p className=" font-medium text-[18px] text-white">: {stock}</p>
              <p className=" font-medium text-[18px] text-white">: {unit}</p>
              <p className=" font-medium text-[18px] text-white">
                : {productInfo}
              </p>
            </div>
          </div>
        </div>{" "}
      </div>

      {/* Stepper start */}

      <div className="w-[150px] h-[460px] flex flex-col justify-between items-center">
        <CreateUserStepper />
        <button
          onClick={createProductHandler}
          className="w-[110px] h-[40px] myBlueBtn font-medium text-[14px] flex justify-center items-center gap-2"
        >
          Create <BsArrowRightShort size={"1.5rem"} />
        </button>
      </div>

      {/* Stepper end */}
    </div>
  );
};

export default CreateUserPreview;
