import { useContextCustom } from "../context/stateContext";
import {  useNavigate } from "react-router-dom";
import { FiFolderPlus } from "react-icons/fi";

const ModalSaleClose = () => {
  const { liHandler,setShowModal,setSaleClose} = useContextCustom();
  const nav=useNavigate();
  
  const salCloseHandler=()=>{
    setSaleClose(true);
    setShowModal(false);
    liHandler("overview");
    nav('/');
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10">
      <div className=" w-[150px] h-[150px] rounded-full bg-[var(--base-color)] flex justify-center items-center">
        <div className=" w-[95px] h-[95px] rounded-full border border-[var(--gray-color)]  bg-[var(--border-color)] flex justify-center items-center">
          <FiFolderPlus size={"2.5rem"} className=" text-[var(--font-color)]" />
        </div>
      </div>
      <p className=" text-[18px] font-semibold text-white">
        Are you sure to sale close?{" "}
      </p>
      <div className="flex justify-between items-center gap-10">
        <button
          onClick={() => setShowModal(false)}
          className="w-[150px] h-[40px] font-medium text-[14px] bg-transparent text-[var(--secondary-color)] border-[var(--border-color)] rounded border px-2 py-1"
        >
          Cancle
        </button>
          <button
            onClick={salCloseHandler}
            className="w-[150px] h-[40px] font-medium text-[14px] bg-[var(--secondary-color)] text-[var(--base-color)] border-[1px] border-[var(--border-color)] rounded-[5px]"
          >
            Yes, close
          </button>
      </div>
    </div>
  );
};

export default ModalSaleClose;
