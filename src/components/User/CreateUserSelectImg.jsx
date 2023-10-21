import { FiUploadCloud } from "react-icons/fi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContextCustom } from "../../context/stateContext";

const CreateUserSelectImg = () => {
  const { liHandler, setShowModal, setUPhoto } = useContextCustom();
  const [showInsertBtn, setShowInsertBtn] = useState(false);
  const [picture, setPicture] = useState();
  const [active, setActive] = useState();
  const imgs = useSelector((state) => state.mediaSlice.photos);
const nav=useNavigate();
  const showBtn = (imgId, imgUrl) => {
    setActive(imgId);
    setShowInsertBtn(true);
    setPicture(imgUrl);
  };

  const insertHandler = () => {
    setUPhoto(picture);
    setShowModal(false);
  };

  const selectImgHandler=()=>{
    liHandler("media");
    setShowModal(false);
    nav('/media')
  }

  return (
    <div className="w-[700px] h-[420px] flex flex-col justify-center items-center gap-10 px-5 ">
      <div className="h-[330px] flex flex-wrap gap-5 justify-center items-start overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-slate-800 
      ">
         {/* overflow-y-scroll */}
        {/* Upload img start */}
        <div onClick={selectImgHandler} className=" cursor-pointer">
            <div className="w-[150px] h-[140px] bg-black flex flex-col justify-center items-center gap-3 border border-[var(--border-color)]">
              <div className=" w-[100px] h-[100px] rounded-full bg-[var(--gray-color)] opacity-5 absolute -top-[25%] -left-[25%]"></div>
              <div className=" w-[67px] h-[67px] border-dashed border-2 border-[var(--secondary-color)] rounded-full bg-[--base-color] flex justify-center items-center">
                <FiUploadCloud
                  className=" text-[--font-color]"
                  size={"1.5rem"}
                />
              </div>
              <p className=" text-white text-[14px]">
                <span className=" text-[--font-color]	select-none">Upload </span>
                Image
              </p>
            </div>
        </div>

        {/* Upload img end */}
        {imgs?.map((photo) => {
          return (
            <div
              key={photo.id}
              onClick={() => showBtn(photo.id, photo.url)}
              className={`${
                active === photo.id
                  ? "border-4 rounded-[5px] border-[var(--font-color)]"
                  : "border rounded-[5px] border-[var(--border-color)]"
              } w-[150px] h-[140px] overflow-hidden flex justify-center items-center cursor-pointer`}
            >
              <img
                src={photo.url}
                className="w-full h-full object-cover object-center"
                loading="lazy"
                alt=""
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={insertHandler}
        className={`${
          showInsertBtn ? "opacity-100" : "opacity-0"
        } w-[100px] h-[40px] font-semibold text-[16px] myBlueBtn ml-auto mb-5`}
      >
        insert
      </button>
    </div>
  );
};

export default CreateUserSelectImg;
