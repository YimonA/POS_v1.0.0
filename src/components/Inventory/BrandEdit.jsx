import { useContextCustom } from "../../context/stateContext";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";

const BrandEdit = () => {
  const { showBrandAdd, setShowBrandAdd, setShowModal } = useContextCustom();

  return (
    <div className={`${showBrandAdd ? "" : "delay-[3000ms] hidden"}`}>
      <div
        className={`sidebar-height bg-[var(--base-color)] p-5 z-20 w-[30%] absolute top-0 border-[3px] border-[var(--border-color)] ease-in-out duration-1000 ${
          showBrandAdd ? "right-0 " : "-right-[100%]"
        }`}
      >
        <p className="flex justify-between items-center text-white text-[18px] font-normal mb-3 gap-3">
          Add new Brand
          <AiOutlineClose
            onClick={() => setShowBrandAdd(false)}
            className=" text-white"
          />
        </p>
        <div className="flex flex-col gap-2">
          <div
            onClick={() => setShowModal(true)}
            className="relative w-[120px] h-[120px] border-[3px] rounded-full border-dashed border-[var(--font-color)] bg-[var(--base-color)] flex justify-center items-center cursor-pointer mx-auto mb-2"
          >
            <img src="" alt="" />
            <MdOutlinePhotoLibrary size={"3rem"} color="white" />
            <div className="absolute bottom-0 right-5 w-[20px] h-[20px] rounded-full bg-white flex justify-center items-center">
              <PiPencilSimpleLineBold />
            </div>
          </div>
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            Brand Name
          </label>
          <input
            type="text"
            //   value={productName}
            //   onChange={(e) => setProductName(e.target.value)}
            className="w-[100%] h-[30px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            Company Name
          </label>
          <input
            type="text"
            //   value={productName}
            //   onChange={(e) => setProductName(e.target.value)}
            className="w-[100%] h-[30px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            Agent
          </label>
          <input
            type="text"
            //   value={productName}
            //   onChange={(e) => setProductName(e.target.value)}
            className="w-[100%] h-[30px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            Phone{" "}
          </label>
          <input
            type="text"
            //   value={productName}
            //   onChange={(e) => setProductName(e.target.value)}
            className="w-[100%] h-[30px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            Description{" "}
          </label>
          <textarea
            //   value={productName}
            //   onChange={(e) => setProductName(e.target.value)}
            className="w-[100%] h-[60px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
        </div>
        <button
          onClick={() => setShowBrandAdd(true)}
          className="w-full h-[35px] font-normal text-[14px] myBlueBtn mt-6"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default BrandEdit;
