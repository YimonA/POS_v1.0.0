import { useContextCustom } from "../../context/stateContext";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from "js-cookie";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateBrandMutation } from "../../redux/api/logoApi";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";

const BrandAdd = () => {
  const token = Cookies.get("token");
  const [createBrand, { isLoading }] = useCreateBrandMutation();
  const {
    showBrandAdd,
    setShowBrandAdd,
    setShowBrandModal,
    setShowModal,
    addBrandPhoto,
    setAddBrandPhoto,
  } = useContextCustom();
  const [brandName, setBrandName] = useState();
  const [companyName, setCompanyName] = useState();
  const [desc, setDesc] = useState();
  const [agentName, setAgentName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const nav = useNavigate();
  const userID = useSelector((state) => state?.authSlice?.user?.id);

  const createBrandHandler = async (e) => {
    e.preventDefault();
    try {
      const newBrand = {
        name: brandName,
        company: companyName,
        user_id: userID,
        agent: agentName,
        phone_no: phoneNo,
        photo: addBrandPhoto,
        description: desc,
      };
      const response = await createBrand({ newBrand, token });
      console.log("response", response);
      setShowBrandAdd(false);
      setBrandName();
      setCompanyName();
      setDesc();
      setAgentName();
      setPhoneNo();
      setAddBrandPhoto();
      nav("/brand");

      setShowModal(true);
    } catch (err) {
      console.log("err", err);
    }
  };

  const showImgHandler = () => {
    setShowBrandModal("image");
    setShowModal(true);
  };

  const SaveHandler = () => {
    setShowBrandModal("create");
    setShowModal(true);
  };
  return (
    <div className={`${showBrandAdd ? "" : "delay-[3000ms] hidden"}`}>
      <div
        className={`h-full bg-[var(--base-color)] p-5 z-20 w-[320px] mt-[45px] absolute top-0 border-[3px] border-[var(--border-color)] ease-in-out duration-1000 ${
          showBrandAdd ? "right-0 " : "-right-[100%]"
        }`}
      >
        <p className="flex justify-between items-center text-white text-[18px] font-normal mb-3 gap-3">
          Add new Brand
          <AiOutlineClose
            onClick={() => setShowBrandAdd(false)}
            className=" text-white cursor-pointer"
          />
        </p>
        <form onSubmit={createBrandHandler} className="flex flex-col gap-2">
          <div
            onClick={showImgHandler}
            className="relative w-[120px] h-[120px] border-[3px] rounded-full border-dashed border-[var(--font-color)] bg-[var(--base-color)] flex justify-center items-center cursor-pointer mx-auto mb-2"
          >
            <img
              src={addBrandPhoto ? addBrandPhoto : ""}
              alt=""
              className={`${
                addBrandPhoto ? "w-[120px] h-[120px] rounded-full" : ""
              }`}
            />
            <MdOutlinePhotoLibrary size={"3rem"} color="white" />
            <div className="absolute bottom-0 right-5 w-[20px] h-[20px] rounded-full bg-white flex justify-center items-center">
              <PiPencilSimpleLineBold />
            </div>
          </div>
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            Brand Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-[100%] h-[30px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-[100%] h-[30px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            Agent
          </label>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="w-[100%] h-[30px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            Phone
          </label>
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-[100%] h-[30px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
          <label
            htmlFor=""
            className="text-white w-[170px] pt-[2px] h-[24px] text-[14px] font-normal "
          >
            Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-[100%] h-[60px] px-2 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
          />
          <button
            onClick={SaveHandler}
            className="w-full h-[35px] font-normal text-[14px] myBlueBtn mt-6"
          >
            {isLoading ? (
              <div className=" flex justify-center items-center gap-2">
                <Loader color="white" size="xs" />
                <span>Loading....</span>
              </div>
            ) : (
              "Save"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrandAdd;
