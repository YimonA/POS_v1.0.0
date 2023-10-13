import { PiPencilSimpleLineBold } from "react-icons/pi";
import { PiStorefrontDuotone } from "react-icons/pi";
import { useContextCustom } from "../../context/stateContext";
import CreateUserStepper from "./CreateUserStepper";
import { BsArrowRightShort } from "react-icons/bs";
import { useEditUserMutation } from "../../redux/api/userApi";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";

const EditStaffPreview = ({ id }) => {
  const {
    setShowModal,
    editUName,
    editUDOB,
    editUGender,
    editUAddress,
    editUPosition,
    editUEmail,
    editUPhone,
    editUPhoto,
  } = useContextCustom();
  const [editUser] = useEditUserMutation();
  const token = Cookies.get("token");
  const [user, setUser] = useState({
    name: editUName,
    email: editUEmail,
    phone_number: editUPhone,
    address: editUAddress,
    gender: editUGender,
    date_of_birth: editUDOB,
    photo: editUPhoto,
  });

  useEffect(() => {
    console.log("staff preview", user);
  }, []);

  const EditStaffHandler = async () => {
    console.log("id", id);
    console.log("user", user);
    const data = await editUser({ user, id, token });
    console.log("res", data);
    if (data?.data?.message === "User Updated successful") {
      setShowModal(true);
    }
  };

  return (
    <div className="flex gap-20 justify-start items-stretch bg-[--base-color]">
      <div className="w-[680px]">
        <div className="px-10 w-[600px] h-fit bg-[var(--sidebar-color)]">
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
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Gender</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">
                Date of Birth
              </p>
            </div>
            <div className="w-fit flex flex-col gap-5 basis-1/2 ps-10">
              <p className=" font-medium text-[18px] text-white">
                : {user?.name}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {user?.email}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {user?.phone_number}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {user?.address}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {user?.gender}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {user?.date_of_birth}
              </p>
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
