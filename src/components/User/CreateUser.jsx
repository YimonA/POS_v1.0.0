import CreateUserInfo from "./CreateUserInfo";
import CreateUserContactInfo from "./CreateUserContactInfo";
import CreateUserPhotoUpload from "./CreateUserPhotoUpload";
import ModalCreateUser from "../ModalCreateUser";
import CreateUserPreview from "./CreateUserPreview";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import CreateUserSelectImg from "./CreateUserSelectImg";
import { useEffect } from "react";

const CreateUser = () => {
  const {
    showModal,
    current,setCurrent,
    liHandler,
    setUName,
    setUDOB,
    setUAddress,
    setUPosition,
    setUEmail,
    setUPhone,
    setUPassword,
    setUConfirmPassword,
    setUPhoto,
  } = useContextCustom();

  useEffect(() => {
    setCurrent(1);
    setUName("");
    setUDOB("");
    setUAddress("");
    setUPosition("");
    setUEmail("");
    setUPhone("");
    setUPassword("");
    setUConfirmPassword("");
    setUPhoto("");
  }, []);

  return (
    <div className=" container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-20">
        <div>
          <p className="breadcrumb-title	">User</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            User / Create User{" "}
          </p>{" "}
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
        {current === 4 ? <CreateUserPreview /> : ""}
        {current === 4 && showModal ? (
          <Modal title={"Create User"} modalView={<ModalCreateUser />} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CreateUser;
