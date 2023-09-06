import CreateUserInfo from "./CreateUserInfo";
import CreateUserContactInfo from "./CreateUserContactInfo";
import CreateUserPhotoUpload from "./CreateUserPhotoUpload";
import ModalCreateProduct from "../ModalCreateProduct";
import CreateUserPreview from "./CreateUserPreview";
import Modal from "../Modal";
import AddProductSelectImg from "./CreateUserSelectImg";
import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import CreateUserSelectImg from "./CreateUserSelectImg";

const CreateUser = () => {
  const { showModal, current, liHandler } = useContextCustom();

  return (
    <div className=" container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-20">
        <div>
          <p className="breadcrumb-title	">User</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
User / Create User          </p>{" "}
        </div>
        <Link to={"/product"}>
          <button
            onClick={() => liHandler("products")}
            className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn"
          >
            Product List
          </button>
        </Link>
      </div>
      {/* Breadcrumg end */}

      <div className=" flex gap-20 justify-start items-stretch">
        {current === 1 ? <CreateUserInfo /> : ""}
        {current === 2 ? <CreateUserContactInfo /> : ""}
        {current === 3 ? <CreateUserPhotoUpload /> : ""}
        {current === 3 && showModal ? (
          <Modal
            title={"Select an image"}
            modalView={<CreateUserSelectImg />}
          />
        ) : (
          ""
        )}
        {/* {current === 4 ? <CreateUserPreview /> : ""}
        {current === 4 && showModal ? (
          <Modal title={"Create Product"} modalView={<ModalCreateProduct />} />
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default CreateUser;
