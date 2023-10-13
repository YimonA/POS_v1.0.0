import { FiUploadCloud } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContextCustom } from "../../context/stateContext";
import { editUserPhoto } from "../../redux/services/userSlice";

const EditUserSelectImg = () => {
  const { liHandler, setShowModal} = useContextCustom();
  const [showInsertBtn, setShowInsertBtn] = useState(false);
  const [picture, setPicture] = useState();
  const [active, setActive] = useState();
  const imgs = useSelector((state) => state.mediaSlice.photos);
  const dispatch=useDispatch();

  const showBtn = (imgId, imgUrl) => {
    setActive(imgId);
    setShowInsertBtn(true);
    setPicture(imgUrl);
  };

  const insertHandler = () => {
    dispatch(editUserPhoto(picture));
    setShowModal(false);
  };

  const selectImgHandler=()=>{
    liHandler("media");
    setShowModal(false);
  }

 

  return (
    <div className="w-[900px] h-[500px] flex flex-col justify-center items-center gap-10 px-5 ">
      <div className="h-[400px] flex flex-wrap gap-5 justify-start items-center 
      ">
         {/* overflow-y-scroll */}
        {/* Upload img start */}
        <div onClick={selectImgHandler} className=" cursor-pointer">
          <Link to={"/media"}>
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
          </Link>
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
        } w-[100px] h-[40px] font-semibold text-[16px] myBlueBtn ml-auto`}
      >
        insert
      </button>
    </div>
  );
};

export default EditUserSelectImg;
