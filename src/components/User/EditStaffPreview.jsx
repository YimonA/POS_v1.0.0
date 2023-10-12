import { PiPencilSimpleLineBold } from "react-icons/pi";
import { PiStorefrontDuotone } from "react-icons/pi";
import { useContextCustom } from "../../context/stateContext";
import CreateUserStepper from "./CreateUserStepper";
import { BsArrowRightShort } from "react-icons/bs";
import { useCreateUserMutation } from "../../redux/api/userApi";
import Cookies from "js-cookie";
import { useEffect } from "react";

const EditStaffPreview = ({id}) => {
  const {
    setShowModal,
    editUName,editUDOB,editUGender,editUAddress,editUPosition,editUEmail,editUPhone,editUPhoto
  } = useContextCustom();
  const [editUser] = useCreateUserMutation();
  const token = Cookies.get("token");

  useEffect(()=>{
    // console.log(uName,
    //   uDOB,
    //   uGender,
    //   uAddress,
    //   uPosition,
    //   uEmail,
    //   uPhone,
    //   uPassword,
    //   uConfirmPassword,
    //   uPhoto)
  },[])

  const EditStaffHandler = async() => {
    // e.preventDefault();
    const user = {
      name: editUName,
      email: editUEmail,
      phone_number: editUPhone,
      address: editUAddress,
      gender: editUGender,
      date_of_birth:"11/9/1990",
    //   date_of_birth:new Date(editUDOB).toISOString().slice(0, 10),
      photo:editUPhoto
        };
        // console.log("dddd",data?.data?.message);
        console.log("id", id);
        console.log("name", user);
        const data =await editUser({ id, token,user });
        console.log("res",data);
    if(data?.data?.message=="Successfully created an account"){
      setShowModal(true);
    }
    // console.log("pppp", users);
  };

  return (
    <div className="flex gap-20 justify-start items-stretch bg-[--base-color]">
      <div className="w-[680px]">
        <div className="px-10 w-[520px] h-fit bg-[var(--sidebar-color)]">
          <div className=" flex justify-between items-center">
            <div className="relative py-10">
              <img
                src={editUPhoto}
                className="-mt-[70px] w-[140px] h-[140px] rounded-full  flex justify-center items-center object-cover object-center"
              />
              <div className="absolute bottom-[40px] right-3 w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
                <PiPencilSimpleLineBold />
              </div>
            </div>

          </div>
          <div className=" border-b-2 border-b-[var(--border-color)] h-[50px] flex justify-start items-center gap-5">
            <PiStorefrontDuotone
              size={"1.8rem"}
              className="text-[var(--font-color)]"
            />
            <p className="text-white text-[16px]">Information</p>
          </div>
          <div className=" flex justify-between items-center py-10">
            <div className="w-fit flex flex-col gap-5 basis-1/2">
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Name</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Email</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Phone</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Address</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">
                Gender
              </p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Date of Birth</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Role</p>
            </div>
            <div className="w-fit flex flex-col gap-5 basis-1/2 ps-10">
              <p className=" font-medium text-[18px] text-white">
                : {editUName}
              </p>
              <p className=" font-medium text-[18px] text-white">: {editUEmail}</p>
              <p className=" font-medium text-[18px] text-white">: {editUPhone}</p>
              <p className=" font-medium text-[18px] text-white">: {editUAddress}</p>
              <p className=" font-medium text-[18px] text-white">: {editUGender}</p>
              <p className=" font-medium text-[18px] text-white">
                {/* : {editUDOB.toISOString().substring(0,10)} */}
              </p>
              <p className=" font-medium text-[18px] text-white">: {editUPosition}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper start */}

      <div className="w-[150px] h-[460px] flex flex-col justify-between items-center">
        <CreateUserStepper />
        <button
          onClick={EditStaffHandler}
          className="w-[110px] h-[40px] myBlueBtn font-medium text-[14px] flex justify-center items-center gap-2"
        >
          Edit <BsArrowRightShort size={"1.5rem"} />
        </button>
      </div>

      {/* Stepper end */}
    </div>
  );
};

export default EditStaffPreview;
 //   banned: 0,
    //   date_of_birth: uDOB,
    //   role: editUPosition,
