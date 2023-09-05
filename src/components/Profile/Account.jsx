import { Link } from "react-router-dom";
import { useContextCustom } from "../../context/stateContext";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import {BsClockFill} from 'react-icons/bs'
import {BsInfoCircleFill} from 'react-icons/bs'
import {LuMailOpen} from 'react-icons/lu'
import {LuPhoneCall} from 'react-icons/lu'


const Account = () => {
  const { liHandler,profileData } = useContextCustom();

  return (
    <div className=" container mx-auto py-4 px-5 bg-[--base-color] pb-20">
      {/* Breadcrumg start */}
      <div className=" flex justify-between items-center mb-20">
        <div>
          <p className="breadcrumb-title	">Profile</p>
          <p className=" text-[14px] text-white opacity-70  select-none">
            Profile / My Account / Information
          </p>{" "}
        </div>
        <Link to={"/profile-edit"}>
          <button
            onClick={() => liHandler("edit")}
            className="w-[140px] h-[40px] font-semibold text-[16px] myBlueBtn"
          >
            Edit Profile
          </button>
        </Link>
      </div>
      {/* Breadcrumg end */}

      <div className="">
        <div className="px-10 h-fit bg-[var(--sidebar-color)]">
          <div className=" flex justify-between items-center">
            <div className=" flex items-center gap-10">

            <div className="relative py-10">
              <img
                // src={}
                className="-mt-[70px] w-[140px] h-[140px] rounded-full  flex justify-center items-center object-cover object-center"
              />
              <div className="absolute bottom-[40px] right-3 w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
                <PiPencilSimpleLineBold />
              </div>
            </div>

            <div className="w-fit">
              <h1 className=" text-[26px] text-white font-semibold">Ethan </h1>
              <span className=" text-[14px] font-medium text-[#C5C1C1]">
                Sale / 
                <BsClockFill className="m-0 inline text-[var(--font-color)] mx-2"/>
                  Active in 1 hr
              </span>
            </div>
            </div>

            <div className=" flex justify-end items-center gap-5 z-20">
              <button className="inline-block bg-gray-700 w-10 h-10 p-3 rounded-full cursor-pointer">
                <LuMailOpen
                  size={"1rem"}
                  className="text-[var(--secondary-color)]"
                />
              </button>
              <button className="inline-block bg-gray-700 w-10 h-10 p-3 rounded-full cursor-pointer">
                <LuPhoneCall
                  size={"1rem"}
                  className="text-[var(--secondary-color)]"
                />
              </button>
            </div>          </div>
          <div className=" border-b-2 border-b-[var(--border-color)] h-[50px] flex justify-start items-center gap-2">
            <BsInfoCircleFill
              size={"1rem"}
              className="text-[var(--font-color)]"
            />
            <p className="text-white text-[16px]">Personal</p>
          </div>
          <div className=" flex justify-between items-center py-10">
            <div className="w-fit flex flex-col gap-5 basis-1/2">
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Date of Birth</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Gender</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Phone</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">Mail</p>
              <p className=" font-medium text-[18px] text-[#B9B9B9]">
Address              </p>
            </div>
            <div className="w-fit flex flex-col gap-5 basis-1/2 ps-10">
              {/* <p className=" font-medium text-[18px] text-white">
                : {productName}
              </p>
              <p className=" font-medium text-[18px] text-white">: {brand}</p>
              <p className=" font-medium text-[18px] text-white">: {stock}</p>
              <p className=" font-medium text-[18px] text-white">: {unit}</p>
              <p className=" font-medium text-[18px] text-white">
                : {productInfo}
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
