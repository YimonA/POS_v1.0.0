import { Link, useParams } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import EditContactInfo from "./EditContactInfo";
import EditUserSelectImg from "./EditUserSelectImg";
import EditProfileInfo from "./EditProfileInfo";
import ModalEditUser from "../ModalEditUser";
import Modal from "../Modal";
import Cookies from "js-cookie";
import { useGetSingleUsersQuery } from "../../redux/api/userApi";
import { useDispatch } from "react-redux";
import EditStaffPhotoUpload from "./EditStaffPhotoUpload";
import EditStaffPreview from "./EditStaffPreview";
import { useEffect } from "react";

const EditAccount = () => {
  const { showModal, current, setCurrent, liHandler } = useContextCustom();
  const { id } = useParams();
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { data: staff } = useGetSingleUsersQuery({ id, token });
  // const singleUser=useSelector((state)=>state.userSlice.singleUser);

  useEffect(() => {
    setCurrent(1);
  }, []);
  // console.log("staff", staff);

  return (
    <div className=" container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-20">
        <div>
          <p className="breadcrumb-title	">Edit Staff</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Staff / Overview / Edit Staff
          </p>
        </div>
        <Link to={"/staff-overview"}>
          <button
            onClick={() => liHandler("staff overview")}
            className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn"
          >
            Staff List
          </button>
        </Link>
      </div>
      {/* Breadcrumg end */}

      <div className=" flex gap-20 justify-start items-stretch">
        {current === 1 ? <EditProfileInfo /> : ""}
        {current === 2 ? <EditContactInfo /> : ""}
        {current === 3 ? <EditStaffPhotoUpload /> : ""}
        {current === 3 && showModal ? (
          <Modal title={"Select an image"} modalView={<EditUserSelectImg />} />
        ) : (
          ""
        )}
        {current === 4 ? <EditStaffPreview id={id} /> : ""}
        {current === 4 && showModal ? (
          <Modal title={"Edit Staff"} modalView={<ModalEditUser />} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EditAccount;
