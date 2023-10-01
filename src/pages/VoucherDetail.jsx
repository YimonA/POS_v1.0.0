import { useEffect } from "react";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { BsPrinter } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../redux/services/cashierSlice";

const VoucherDetail = () => {
  const [voucher, setVoucher] = useState();
  const location = useLocation();
  const voucherList = location.state?.voucher;
  const nav=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
    setVoucher(voucherList);
  },[])

  const nextSaleHandler=()=>{
    dispatch(clearCart());
    nav('/cashier');
  }
  // console.log("location", location);
  return (
    <div className=" min-h-screen min-w-full bg-[--base-color]">
      <div className="container-fluid h-[45px] p-5 flex justify-between items-center bg-[--base-color] text-[--secondary-color] border-2 border-[--border-color]">
        <Link to={'/cashier'}>
        <button className="text-[var(--secondary-color)] text-[14px] font-semibold flex justify-center items-center gap-3">
          <BsArrowLeft size={"1.3rem"} />
          Back
        </button></Link>
      </div>
      <div className="w-[500px] min-h-[400px] p-10 bg-[var(--sidebar-color)] mx-auto my-10">
        <p className="text-[var(--secondary-color)] text-[27px] font-semibold px-10 py-5">
          Receive
        </p>
        {voucher?.records?.map((v) => {
          return (
            <div
              key={v?.product_id}
              className=" flex justify-between items-center border-b-2 border-[--border-color] px-10 py-5"
            >
              <div>
                <p className="text-[var(--secondary-color)] text-[16px] font-bold">
                  {v?.product_name}
                </p>
                <p className="text-[var(--gray-color)] text-[14px] font-bold">
                {v?.quantity} Qty / Unit Price {v?.price} Ks
                </p>
              </div>
              <p className="text-[var(--secondary-color)] text-[16px] font-bold">
              {v?.cost}
              </p>
            </div>
          );
        })}

        
        <div className="flex flex-col items-end border-b-2 border-[--border-color] px-10 py-5">
          <p className="text-[var(--secondary-color)] text-[14px] font-bold">
            Cost: {voucher?.total.toFixed(2)}
          </p>
          <p className="text-[var(--gray-color)] text-[12px] font-base">
            Tax: {voucher?.tax.toFixed(2)}
          </p>
        </div>
        <p className="flex justify-end text-[var(--secondary-color)] text-[14px] font-bold border-b-2 border-[--border-color] px-10 py-5">
          Total: {voucher?.net_total.toFixed(2)}
        </p>
      </div>
      {/* btn */}
      <div className=" h-[40px] flex justify-center gap-3">
        <Link to={"/recent"}>
          <button
            className={`text-[var(--secondary-color)] px-3 hover:text-[#8AB4F8] active:text-[#8AB4F8] btn-border-table-grid`}
          >
            Recent
          </button>
        </Link>
          <button onClick={nextSaleHandler}
            className={`text-[var(--secondary-color)] px-3 hover:text-[#8AB4F8] active:text-[#8AB4F8] btn-border-table-grid`}
          >
            Next Sale
          </button>
        <button
          className={`text-[#8AB4F8] px-3 hover:text-[#8AB4F8] active:text-[#8AB4F8] btn-border-table-grid`}
          onClick={() => window.print()}
        >
          <BsPrinter />
        </button>
      </div>
    </div>
  );
};

export default VoucherDetail;
