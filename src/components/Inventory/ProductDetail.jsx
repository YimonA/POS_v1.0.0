import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import {PiPencilSimpleLineBold} from "react-icons/pi";


const ProductDetail = () => {
  const { liHandler } = useContextCustom();

  return (
    <div className=" container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-20">
        <div>
          <p className="breadcrumb-title	">Product Detail</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Inventory / Products / Product Detail
          </p>{" "}
        </div>
        <div>
          <Link to={"/products"}>
            <button
              onClick={() => liHandler("products")}
              className="w-[200px] h-[40px] font-semibold text-[16px] bg-transparent text-[var(--font-color)] border-[1px] border-[var(--border-color)] rounded-[5px] mr-5"
            >
              Products Overview
            </button>
          </Link>
          <button
            onClick={() => liHandler("products")}
            className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn"
          >
            Edit Product
          </button>{" "}
        </div>
      </div>
            {/* Breadcrumg end */}

      {/* detail info start */}

      <div className="flex gap-20 justify-start items-stretch bg-[--base-color]">
      <div className="w-[680px]">
        <div className="px-10 w-[520px] h-fit bg-[var(--sidebar-color)]">
          <div className=" flex justify-between items-center border-b-2 border-b-[var(--border-color)]">
            <div className="relative py-10">
              <img
                // src={photo}
                className="-mt-[70px] w-[140px] h-[140px] rounded-full  flex justify-center items-center object-cover object-center"
              />
              <div className="absolute bottom-[40px] right-3 w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
                <PiPencilSimpleLineBold />
              </div>
            </div>

            <div>
              <h1 className=" text-[26px] text-white font-semibold">
                Water {/* {productName} */}
              </h1>
            </div>
          </div>
          
          <div className=" flex justify-between items-center py-10">
            <div className="w-fit flex flex-col gap-5 basis-1/2">
              
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Brand</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Stock</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Unit</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">
                More Information
              </p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Sale Price</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Actual Price</p>
            </div>
            <div className="w-fit flex flex-col gap-5 basis-1/2 ps-10">
              {/* <p className=" font-medium text-[18px] text-white">
                : {productName}
              </p>
              <p className=" font-medium text-[18px] text-white">: {brand}</p>
              <p className=" font-medium text-[18px] text-white">: {stock}</p>
              <p className=" font-medium text-[18px] text-white">: {unit}</p>
              <p className=" font-medium text-[18px] text-white">
                : {productInfo}
              </p> */}
            </div>
          </div>
        </div>
      </div>

      {/* detail info end */}
    </div>
          {/* detail info end */}

      {/*stock History table start */}
      {/*stock History table end */}

       {/*sale History table start */}
      {/*sale History table end */}

    </div>
  );
};

export default ProductDetail;