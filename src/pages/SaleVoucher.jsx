import { Navbar } from "@mantine/core";
import { BsArrowLeft } from "react-icons/ai";
import { BsPrinter } from "react-icons/bs";
import { Link } from "react-router-dom";

const SaleVoucher = () => {
  return (
    <div className=" min-h-screen min-w-full bg-[--base-color]">
      <Navbar />
      <div className="container-fluid h-[45px] p-5 flex justify-between items-center bg-[--base-color] text-[--secondary-color] border-2 border-[--border-color]">
        <p className="text-[var(--secondary-color)] text-[14px] font-semibold flex justify-center items-center gap-3">
          <BsArrowLeft size={"1.3rem"} />
          Back
        </p>
      </div>
      <div className="w-[500px] min-h-[400px] p-10 bg-[var(--sidebar-color)] mx-auto my-10">
        <p className="text-[var(--secondary-color)] text-[27px] font-semibold px-10 py-5">
          Receive
        </p>
        <div className=" flex justify-between items-center border-b-2 border-[--border-color] px-10 py-5">
          <div>
            <p className="text-[var(--secondary-color)] text-[16px] font-bold">
              Avocado
            </p>
            <p className="text-[var(--gray-color)] text-[14px] font-bold">
              1 Qty 2000 Ks{" "}
            </p>
          </div>
          <p className="text-[var(--secondary-color)] text-[16px] font-bold">
            2,000
          </p>
        </div>
        <div className=" flex justify-between items-center border-b-2 border-[--border-color] px-10 py-5">
          <div>
            <p className="text-[var(--secondary-color)] text-[16px] font-bold">
              Pineapple
            </p>
            <p className="text-[var(--gray-color)] text-[14px] font-bold">
              1 Qty 2000 Ks{" "}
            </p>
          </div>
          <p className="text-[var(--secondary-color)] text-[16px] font-bold">
            2,000
          </p>
        </div>
        <div className="flex flex-col items-end border-b-2 border-[--border-color] px-10 py-5">
          <p className="text-[var(--secondary-color)] text-[14px] font-bold">
            Cost: 33,500
          </p>
          <p className="text-[var(--gray-color)] text-[12px] font-base">
            Tax: 400
          </p>
        </div>
        <p className="flex justify-end text-[var(--secondary-color)] text-[14px] font-bold border-b-2 border-[--border-color] px-10 py-5">
          Total: 33,900
        </p>
      </div>
      {/* btn */}
      <div className=" h-[40px] flex justify-center gap-3">
        <Link to={"/recent"}>
          <button
            className={`text-[var(--secondary-color)] px-3 hover:text-[#8AB4F8] active:text-[#8AB4F8] btn-border-table-grid`}
          >
            Recent{" "}
          </button>
        </Link>
        <button
          className={`text-[var(--secondary-color)] px-3 hover:text-[#8AB4F8] active:text-[#8AB4F8] btn-border-table-grid`}
        >
          Next Sale{" "}
        </button>
        <button
          className={`text-[#8AB4F8] px-3 hover:text-[#8AB4F8] active:text-[#8AB4F8] btn-border-table-grid`}
        >
          <BsPrinter />
        </button>
      </div>
    </div>
  );
};

export default SaleVoucher;
