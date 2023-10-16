import PropTypes from "prop-types";
import { Button } from "@mantine/core";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiCopy } from "react-icons/bi";
import Cookies from "js-cookie";
import { useDeletePhotoMutation } from "../../redux/api/mediaApi";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addPhotos } from "../../redux/services/mediaSlice";
import { useContextCustom } from "../../context/stateContext";
import MediaImgDetail from "./MediaImgDetail";
import Swal from "sweetalert2";

const MediaGrid = ({ imgs }) => {
  MediaGrid.propTypes = {
    imgs: PropTypes.array,
  };

  const { showModal, setShowModal } = useContextCustom();
  const [imgIndex, setImgIndex] = useState();
  const [imgDetail, setImgDetail] = useState();

  const token = Cookies.get("token");
  const [deletePhoto] = useDeletePhotoMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addPhotos({ photos: imgs }));
  }, [imgs]);

  const deletePhotoHandler = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const { data } = await deletePhoto({ id, token });
        // console.log('del',data);
      }
    });
  };
  const imgModalHandler = (index) => {
    setImgIndex(index);
    setShowModal(true);
    setImgDetail(imgs[index]);
    // console.log("id", imgDetail);
  };

  return (
    <div className=" flex flex-wrap gap-1">
      {imgs?.map((photo, index) => {
        return (
          <Button
            key={photo.id}
            className={` w-[200px] h-[150px] rounded-[5px] bg-center bg-cover myBtn`}
          >
            <img
              src={photo?.url}
              onClick={() => imgModalHandler(index)}
              alt=""
              className=" absolute w-[80%] h-full cursor-pointer"
            />
            <span
              className={`myBtnGroup duration-500	ease-in-out z-20 absolute bottom-0 right-5 w-[60px] h-[50px] mx-auto flex justify-center items-center gap-3`}
            >
              <span
                onClick={() => deletePhotoHandler(photo?.id)}
                className={`text-[--base-color] basis-1/2 bg-[--secondary-color] p-1 rounded-[5px] opacity-90 cursor-pointer`}
              >
                <RiDeleteBinLine size={"1.5rem"} />
              </span>
              <span
                onClick={() => navigator.clipboard.writeText(photo?.url)}
                className={`text-[--base-color] basis-1/2 bg-[--secondary-color] p-1 rounded-[5px] opacity-90 cursor-pointer`}
              >
                <BiCopy size={"1.5rem"} />
              </span>
            </span>
          </Button>
        );
      })}
      {showModal ? (
        <MediaImgDetail show={true} imgIndex={imgIndex} imgDetail={imgDetail} imgs={imgs} />
      ) : (
        ""
      )}
    </div>
  );
};

export default MediaGrid;
