import { PiPencilSimpleLineBold } from "react-icons/pi";
import { PiStorefrontDuotone } from "react-icons/pi";
import { useContextCustom } from "../../context/stateContext";
import CreateUserStepper from "./CreateUserStepper";
import { BsArrowRightShort } from "react-icons/bs";
import { useCreateUserMutation } from "../../redux/api/userApi";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Loader } from "@mantine/core";

const CreateUserPreview = () => {
  const {
    setShowModal,
    uName,
    uDOB,
    uGender,
    uAddress,
    uPosition,
    uEmail,
    uPhone,
    uPassword,
    uConfirmPassword,
    uPhoto,
  } = useContextCustom();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const token = Cookies.get("token");

  useEffect(() => {
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
  }, []);

  const CreateUserHandler = async () => {
    const user = {
      name: uName,
      email: uEmail,
      password: uPassword,
      phone_number: uPhone,
      address: uAddress,
      gender: uGender,
      date_of_birth: new Date(uDOB).toLocaleDateString("es-CL"),
      role: uPosition,
      photo: uPhoto,
      password_confirmation: uConfirmPassword,
    };
    const data = await createUser({ user, token });
    console.log("dddd",data);
    // console.log("dddd",data?.data?.message);

    // console.log("name", user);
    if (data?.data?.message == "Successfully created an account") {
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
                src={uPhoto}
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
            <div className="w-fit flex flex-col gap-5 basis-2/6">
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Name</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Email</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Phone</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Address</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Gender</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">
                Date of Birth
              </p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Role</p>
            </div>
            <div className="w-fit flex flex-col gap-5 basis-4/6 ps-10">
              <p className=" font-medium text-[18px] text-white">: {uName}</p>
              <p className=" font-medium text-[18px] text-white">: {uEmail}</p>
              <p className=" font-medium text-[18px] text-white">: {uPhone}</p>
              <p className=" font-medium text-[18px] text-white">
                : {uAddress}
              </p>
              <p className=" font-medium text-[18px] text-white">: {uGender}</p>
              <p className=" font-medium text-[18px] text-white">
              : {uDOB?uDOB.toLocaleDateString("es-CL"):null}
              </p>
              <p className=" font-medium text-[18px] text-white">
                : {uPosition}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper start */}

      <div className="w-[150px] h-[460px] flex flex-col justify-between items-center">
        <CreateUserStepper />
        <button
          onClick={CreateUserHandler}
          className="w-[150px] h-[40px] myBlueBtn font-medium text-[14px] "
        >
          {isLoading ? (
            <div className=" flex justify-center items-center gap-2">
              <Loader color="white" size="xs" />
              <span>Loading....</span>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1">
              <span>Create</span> <BsArrowRightShort size={"1.5rem"} />
            </div>
          )}
        </button>
      </div>

      {/* Stepper end */}
    </div>
  );
};

export default CreateUserPreview;
