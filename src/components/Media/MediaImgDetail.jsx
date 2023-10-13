import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiCopy } from "react-icons/bi";
import { useDeletePhotoMutation } from "../../redux/api/mediaApi";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { addPhotos } from "../../redux/services/mediaSlice";
import { useContextCustom } from "../../context/stateContext";

const MediaImgDetail = ({show, imgIndex, imgDetail, imgs }) => {
  MediaImgDetail.propTypes = {
    show:PropTypes.bool,
    imgIndex:PropTypes.number,
    imgDetail:PropTypes.object,
    imgs: PropTypes.array,
  };

  const { setShowModal } = useContextCustom();
  const [deletePhoto] = useDeletePhotoMutation();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [imgAry, setImgAry] = useState(imgs);
  // console.log('hh',imgIndex)
  // console.log('imgDetail',imgDetail)
  // console.log('imgAry',imgAry)

  const [pictureDetail, setPictureDetail] = useState(imgDetail);
  const [pictureIndex, setPictureIndex] = useState(imgIndex);
  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(true);

  // console.log('iid',imgDetail)

  useEffect(() => {
    dispatch(addPhotos({ photos: imgs }));
  }, [imgs]);

  useEffect(() => {
    if (pictureIndex === imgAry.length - 1) {
      setShowNext(false);
    } else if (pictureIndex === 0) {
      setShowPrev(false);
    } else if (pictureIndex < imgAry.length && pictureIndex > 0) {
      setShowNext(true);
      setShowPrev(true);
    }
  }, [pictureIndex]);

  const deletePhotoHandler = async (id) => {
    const { data } = await deletePhoto({ id, token });
    // console.log("del", data);
    setShowModal(false);
  };

  const nextBtn = () => {
    if (pictureIndex < imgAry.length - 1) {
      setPictureDetail(imgs[pictureIndex + 1]);
      setPictureIndex(pictureIndex + 1);
    }
  };

  const prevBtn = () => {
    if (pictureIndex < imgAry.length && pictureIndex != 0) {
      setPictureDetail(imgs[pictureIndex - 1]);
      setPictureIndex(pictureIndex - 1);
    }
  };

  return (
    <div
      className={`${
        show ? "flex" : "hidden"
      } justify-center items-center absolute top-0 left-0 w-screen h-full  `}
    >
      <div className="z-20 absolute top-0 left-0 h-screen w-screen bg-black opacity-70"></div>
      <div className="z-50 min-w-[500px] min-h-[500px] flex flex-col justify-start items-center bg-[var(--sidebar-color)] border border-[var(--border-color)]">
        <div className="w-full h-[60px] px-5 flex justify-between items-center gap-10 bg-black mb-10">
          <span className="select-none text-[18px] font-semibold text-[var(--secondary-color)] text-center">
            {pictureDetail?.name}
          </span>
          <MdClose
            onClick={() => setShowModal(false)}
            size={"1.5rem"}
            className="cursor-pointer text-[var(--secondary-color)]"
          />
        </div>

        {/* mordal body start */}
        <div className="w-full h-full bg-[--base-color] py-10 ">
          <div className=" flex justify-between items-center mb-10">
            <MdArrowBackIosNew
              onClick={prevBtn}
              className={` ${
                showPrev ? "block" : "opacity-0"
              }  text-[--secondary-color] cursor-pointer mx-2`}
              size={"1.5rem"}
            />
            <img
              src={pictureDetail?.url}
              className="w-[320px] h-[300px]"
              alt=""
            />
            <MdArrowForwardIos
              onClick={nextBtn}
              className={` ${
                showNext ? "block" : "opacity-0"
              } text-[--secondary-color] cursor-pointer mx-2`}
              size={"1.5rem"}
            />
          </div>
          <div className="w-[60px] h-[50px] mx-auto flex justify-center items-center gap-3">
            <button
              onClick={() => deletePhotoHandler(pictureDetail?.id)}
              className={`text-[--base-color] basis-1/2 bg-[--secondary-color] p-1 rounded-[5px] `}
            >
              <RiDeleteBinLine size={"1.5rem"} />
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(pictureDetail?.url)}
              className={`text-[--base-color] basis-1/2 bg-[--secondary-color] p-1 rounded-[5px] `}
            >
              <BiCopy size={"1.5rem"} />
            </button>
          </div>
        </div>
        {/* mordal body end */}
      </div>
    </div>
  );
};

export default MediaImgDetail;
