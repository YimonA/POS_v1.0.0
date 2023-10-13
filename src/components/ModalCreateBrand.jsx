import { BsCheckLg } from "react-icons/bs";
// import { useContextCustom } from "../context/stateContext";

const ModalCreateBrand = () => {
  // const { liHandler} = useContextCustom();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10">
          <div className=" w-[150px] h-[150px] rounded-full bg-[var(--base-color)] flex justify-center items-center">
            <div className=" w-[95px] h-[95px] rounded-full border border-[var(--gray-color)]  bg-[var(--border-color)] flex justify-center items-center">
              <BsCheckLg size={"4rem"} color="green" />
            </div>
          </div>
          <p className=" text-[18px] font-semibold text-white">
            Successfully created the Brand
          </p>
        </div>
  )
}

export default ModalCreateBrand