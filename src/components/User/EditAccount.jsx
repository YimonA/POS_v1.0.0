import { Link, useParams } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import EditContactInfo from "./EditContactInfo";
import EditPassword from "./EditPassword";
import EditProfileInfo from "./EditProfileInfo";
import Cookies from "js-cookie";
import { useGetSingleUsersQuery } from "../../redux/api/userApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleUser } from "../../redux/services/userSlice";

const EditAccount = () => {
  const { showModal, current, liHandler ,editUName,setEditUName,editUDOB,setEditUDOB,editUGender,setEditUGender,editUAddress,setEditUAddress,editUPosition,setEditUPosition,editUEmail,setEditUEmail,editUPhone,setEditUPhone,editUPassword,setEditUPassword,editUConfirmPassword,setEditUConfirmPassword,editUPhoto,setEditUPhoto} = useContextCustom();
const {id}=useParams();
const token=Cookies.get('token');
const dispatch=useDispatch();
const{data}=useGetSingleUsersQuery({id,token});
const singleUser=useSelector((state)=>state.userSlice.singleUser);

useEffect(()=>{
  dispatch(addSingleUser({singleUser:data}));
},[data]);
console.log('singleUser',singleUser);

  return (
    <div className=" container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-20">
        <div>
          <p className="breadcrumb-title	">Edit User</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            User / Overview / Edit User
          </p>
        </div>
        <Link to={"/user-overview"}>
          <button
            onClick={() => liHandler("user overview")}
            className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn"
          >
            User List
          </button>
        </Link>
      </div>
      {/* Breadcrumg end */}

      <div className=" flex gap-20 justify-start items-stretch">
        {current === 1 ? <EditProfileInfo {...singleUser}/> : ""}
        {current === 2 ? <EditContactInfo {...singleUser}/> : ""}
        {current === 3 ? <EditPassword {...singleUser}/> : ""}
        {/* {current === 3 && showModal ? (
          <Modal
            title={"Select an image"}
            modalView={<AddProductSelectImg />}
          />
        ) : (
          ""
        )}
        {current === 4 && showModal ? (
          <Modal title={"Create Product"} modalView={<ModalCreateProduct />} />
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default EditAccount;
