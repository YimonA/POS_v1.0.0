import { PiPencilSimpleLineBold } from "react-icons/pi";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { useContextCustom } from "../../context/stateContext";
import CreateUserStepper from "./CreateUserStepper";
import { BsArrowRightShort } from "react-icons/bs";
import Cookies from "js-cookie";
import { useCreateUserMutation } from "../../redux/api/userApi";

const EditStaffPhotoUpload = () => {
  const {
    setShowModal,
    nextStepperHandler,
    editUPhoto,setEditUPhoto  } = useContextCustom();
  // const [createUser] = useCreateUserMutation();
  // const token = Cookies.get("token");

  // const CreateUserHandler = async(e) => {
  //   e.preventDefault();
  //   const user = {
  //     name: uName,
  //     email: uEmail,
  //     password: uPassword,
  //     phone_number: uPhone,
  //     address: uAddress,
  //     gender: uGender,
  //     date_of_birth: uDOB,
  //     role: uPosition,
  //     photo: uPhoto,
  //     password_confirmation: uConfirmPassword
  //   };
  //   const data =await createUser({ user, token });
  //   console.log("dddd", data);
  //   console.log("name", user);
  //   // console.log("pppp", users);

  //   // setShowModal(true);
  // };

  const photoUploadHandler = () => {
    setShowModal(true);
  };
  const next=()=>{
    nextStepperHandler(4)
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
  }
  return (
    <div className="flex gap-20 justify-start items-stretch bg-[--base-color]">
      <div className=" w-[680px] h-fit bg-[var(--sidebar-color)] flex flex-col justify-center items-center gap-14 py-10">
        <p className=" text-white text-[16px] font-semibold">Upload Photo</p>
        {editUPhoto ? (
          <img
            src={editUPhoto}
            alt=""
            className=" relative w-[180px] h-[180px] border-[3px] rounded-full flex justify-center items-center cursor-pointer"
          />
        ) : (
          <div
            onClick={photoUploadHandler}
            className="relative w-[180px] h-[180px] border-[3px] rounded-full border-dashed border-[var(--font-color)] bg-[var(--base-color)] flex justify-center items-center cursor-pointer"
          >
            <img src="" alt="" />
            <MdOutlinePhotoLibrary size={"4rem"} color="white" />
            <div className="absolute bottom-0 right-5 w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
              <PiPencilSimpleLineBold />
            </div>
          </div>
        )}

        <button
          onClick={() => setEditUPhoto(null)}
          className=" w-[110px] h-[40px] text-[var(--secondary-color)] border rounded-[5px] border-[var(--secondary-color)] font-medium text-[12px]"
        >
          Clear Photo
        </button>
      </div>
      <div className="w-[150px] h-[460px] flex flex-col justify-between items-center">
        <CreateUserStepper />
        <button
          onClick={next}
          className="w-[110px] h-[40px] myBlueBtn font-medium text-[14px] flex justify-center items-center gap-2"
        >
          Next <BsArrowRightShort size={"1.5rem"} />
        </button>
      </div>
    </div>
  );
};

export default EditStaffPhotoUpload;


