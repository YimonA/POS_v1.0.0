import { useState } from "react";
import {
  useEditBrandMutation,
  useGetSinglBrandQuery,
} from "../../redux/api/logoApi";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useContextCustom } from "../../context/stateContext";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import BrandEditSelectImg from "./BrandEditSelectImg";
import Modal from "../Modal";

const BrandEdit = () => {
  const { setShowModal, showModal, editBrandPhoto, setEditBrandPhoto } =
    useContextCustom();
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [description, setDescription] = useState();
  // const [photo, setPhoto] = useState();
  const [agent, setAgent] = useState();
  const [phone, setPhone] = useState();

  const token = Cookies.get("token");
  const { id } = useParams();
  const { data } = useGetSinglBrandQuery({ id, token });

  const nav = useNavigate();
  const [editBrand] = useEditBrandMutation();

  // console.log("data", data?.data);

  useEffect(() => {
    setName(data?.data?.name);
    setAgent(data?.data?.agent);
    setCompany(data?.data?.agent);
    setDescription(data?.data?.agent);
    setPhone(data?.data?.phone_no);
    setEditBrandPhoto(data?.data?.photo);
    // setPhoto(data?.data?.photo)
    // console.log("stockData", qty, more);
  }, [data]);

  useEffect(() => {
    // setPhoto(editBrandPhoto);
    console.log("editBrandPhoto", editBrandPhoto);
    // console.log("setPhoto", photo);
  }, [editBrandPhoto]);

  const EditBrandHandler = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        name,
        company,
        description,
        agent,
        phone_no: phone,
        photo:editBrandPhoto,
      };
      console.log("newData", newData);
      const response = await editBrand({
        id: Number(id),
        newData: newData,
        token,
      });
      console.log("response", response);
      nav("/brand");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    // <></>
    <div
      className={`w-full h-full bg-[var(--base-color)] p-5 z-20 top-0 border-[3px] border-[var(--border-color)] flex flex-col justify-between `}
    >
      <div className=" mb-5">
        <p className="breadcrumb-title	">Edit Brand</p>
        <p className=" text-[14px] text-white opacity-70  select-none">
          Inventory / Edit Brand
        </p>
      </div>

      <div className="w-[680px] bg-[var(--sidebar-color)] px-10 py-5">
        <form onSubmit={EditBrandHandler} className="flex flex-col gap-2 ">
          <div
            onClick={() => setShowModal(true)}
            className="relative w-[140px] h-[140px] border-[3px] rounded-full border-dashed border-[var(--font-color)] bg-[var(--base-color)] flex justify-center items-center cursor-pointer mb-7"
          >
            <img
              src={editBrandPhoto ? editBrandPhoto : null}
              className={`${
                editBrandPhoto
                  ? "relative w-[140px] h-[140px] border-[3px] rounded-full flex justify-center items-center cursor-pointer object-cover object-center"
                  : ""
              }`}
              alt=""
            />
            <MdOutlinePhotoLibrary size={"2rem"} color="white" />
            <div className="absolute bottom-0 right-0 w-[30px] h-[30px] rounded-full bg-white flex justify-center items-center">
              <PiPencilSimpleLineBold />
            </div>
          </div>
          <div className=" flex justify-start items-start mb-3">
            <label className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold">
              Name
            </label>
            <input
              type="text"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
          <div className=" flex justify-start items-start mb-3">
            <label className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold">
              Company
            </label>
            <input
              type="text"
              defaultValue={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
          <div className=" flex justify-start items-start mb-3">
            <label className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold">
              Phone
            </label>
            <input
              type="text"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
          <div className=" flex justify-start items-start mb-3">
            <label className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold">
              Agent
            </label>
            <input
              type="text"
              defaultValue={agent}
              onChange={(e) => setAgent(e.target.value)}
              className="w-[380px] h-[50px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
          <div className=" flex justify-start items-start mb-3">
            <label className="text-white w-[170px] pt-[2px] h-[24px] text-[16px] font-semibold">
              Description
            </label>
            <textarea
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-[380px] h-[100px] px-5 py-1 border-2 rounded-[5px] border-[var(--border-color)] bg-[var(--base-color)] text-[var(--secondary-color)]"
            />
          </div>
          <button
            type="submit"
            className="w-[200px] h-[35px] font-normal text-[14px] myBlueBtn my-6 ms-auto"
          >
            Edit
          </button>
        </form>
      </div>
      {showModal ? (
        <Modal title={"Select an image"} modalView={<BrandEditSelectImg />} />
      ) : (
        ""
      )}
    </div>
  );
};

export default BrandEdit;
