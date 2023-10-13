import PropTypes from "prop-types";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiCopy } from "react-icons/bi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useDeletePhotoMutation } from "../../redux/api/mediaApi";
import { useEffect, useState } from "react";
import { addPhotos } from "../../redux/services/mediaSlice";
import MediaImgDetail from "./MediaImgDetail";
import { useContextCustom } from "../../context/stateContext";
import Swal from "sweetalert2";

const MediaTable = ({ imgs }) => {
  MediaTable.propTypes = {
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

  const deletePhotoHandler = async (e,id) => {
    e.stopPropagation();
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

  const copyHandler = (e,copytext) => {
    e.stopPropagation();
    navigator.clipboard.writeText(copytext);
    // console.log("a", a);
  };

  const imgModalHandler = (index) => {
    setImgIndex(index);
    setShowModal(true);
    setImgDetail(imgs[index]);
    // console.log("id", imgDetail);
  };

  return (
    <div>
      <table className=" w-full text-gray-200 border border-gray-700 text-sm ">
        <thead>
          <tr className=" border-b border-b-gray-700">
            <th className=" py-4 text-center px-1 uppercase font-medium">No</th>
            <th className=" py-4 text-end px-1 uppercase font-medium">Name</th>
            <th className=" py-4 text-end px-1 uppercase font-medium">
              Account
            </th>
            <th className=" py-4 text-end px-1 uppercase font-medium">
              Extension
            </th>
            <th className=" py-4 pe-4 text-end px-1 uppercase font-medium">
              File Size
            </th>
            <th className=" py-4 pe-4 text-end px-1 uppercase font-medium"></th>
          </tr>
        </thead>
        <tbody className=" text-gray-100">
          {imgs!==null?
          imgs?.map((photo, index) => {
            return (
              <tr onClick={() => imgModalHandler(index)}
              key={photo?.id} className=" border-b border-b-gray-700 cursor-pointer">
                <td className="px-1 text-center  py-4">{index + 1}</td>
                <td
                  className="px-1 text-end py-4 "
                >
                  {photo?.name}
                </td>
                <td className="px-1 text-end py-4">{photo.user_name}</td>
                <td className="px-1 py-4 text-end">{photo?.extension}</td>
                <td className="px-1 pe-4 py-4 text-end">{Math.ceil(Number(photo?.fileSize)/1028)} MB</td>

                <td>
                  <div className="w-[60px] mx-auto flex justify-end items-center gap-2 z-20">
                    <button
                      onClick={(e) => deletePhotoHandler(e,photo?.id)}
                      className={`text-[--secondary-color] basis-1/2 hover:text-[#8AB4F8]px-1 `}
                    >
                      <RiDeleteBinLine size={"1.3rem"} />
                    </button>
                    <button
                      // onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}

                      onClick={(e) => copyHandler(e,photo?.url)}
                      className={`text-[--secondary-color] basis-1/2 hover:text-[#8AB4F8]px-1 `}
                    >
                      <BiCopy size={"1.3rem"} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          }):''}
        </tbody>
      </table>
      {showModal ? (
        <MediaImgDetail show={true} imgIndex={imgIndex} imgDetail={imgDetail} imgs={imgs} />
      ) : (
        ""
      )}
    </div>
  );
};

export default MediaTable;
