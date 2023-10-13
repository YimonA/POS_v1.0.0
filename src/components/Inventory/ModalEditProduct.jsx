import { BsCheckLg } from "react-icons/bs";
import { useContextCustom } from "../../context/stateContext";
import { Link, useNavigate } from "react-router-dom";

const ModalEditProduct = () => {
  const { liHandler, setShowModal } = useContextCustom();
  const nav = useNavigate();
  const seeAll = () => {
    setShowModal(false);
    liHandler("products");
    nav("/products");
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10">
      <div className=" w-[150px] h-[150px] rounded-full bg-[var(--base-color)] flex justify-center items-center">
        <div className=" w-[95px] h-[95px] rounded-full border border-[var(--gray-color)]  bg-[var(--border-color)] flex justify-center items-center">
          <BsCheckLg size={"4rem"} color="green" />
        </div>
      </div>
      <p className=" text-[18px] font-semibold text-white">
        Successfully created the product
      </p>
      <button
        onClick={seeAll}
        className="w-[250px] h-[40px] font-medium text-[14px] myBlueBtn"
      >
        SEE ALL PRODUCTS
      </button>
    </div>
  );
};

export default ModalEditProduct;
