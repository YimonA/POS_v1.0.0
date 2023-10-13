import { BsCheckLg } from "react-icons/bs";
import { useContextCustom } from "../context/stateContext";
import {  useNavigate } from "react-router-dom";

const ModalEditUser = () => {
  const { liHandler,setShowModal} = useContextCustom();
const nav=useNavigate();

  const seeAll=()=>{
    liHandler("staff overview");
    setShowModal(false);
    nav('/staff-overview')
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10">
          <div className=" w-[150px] h-[150px] rounded-full bg-[var(--base-color)] flex justify-center items-center">
            <div className=" w-[95px] h-[95px] rounded-full border border-[var(--gray-color)]  bg-[var(--border-color)] flex justify-center items-center">
              <BsCheckLg size={"4rem"} color="green" />
            </div>
          </div>
          <p className=" text-[18px] font-semibold text-white">
            Successfully update the Staff
          </p>
          <button onClick={seeAll} className="w-[250px] h-[40px] font-medium text-[14px] myBlueBtn">
            SEE ALL Staff
          </button>
        </div>
  )
}

export default ModalEditUser